import { conectandoAoBanco } from "../config/configBD";
import { Usuarios } from "../models/users";

import zod from 'zod';
import { usuarioExistente } from "../utils/verify";

const validacao = zod.object({
    nome: zod.string().min(4, 'O nome deve conter no mínimo 4 caracteres.'),
    email: zod.string().email('Email inválido.'),
    senha: zod.string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial')
        .regex(/\d/, 'A senha deve conter pelo menos um número')
});

export async function inserirUsuario(usuario: Usuarios): Promise<void> {
    const db = await conectandoAoBanco();
    const valid = validacao.safeParse(usuario);

    if (await usuarioExistente(usuario.nome, usuario.email)) {
        console.log('Este usuário já está cadastrado.');
        return;
    }

    if (!valid.success) {
        console.log('Erro na validação: ', valid.error.format());
        return;
    }

    const query = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    try {
        const result = await db.run(query, [usuario.nome, usuario.email, usuario.senha]);
        const userID = result.lastID;

        await db.run(`INSERT INTO logs(acao, tabela_afetada, item_afetado) VALUES(?,?,?)`, ['insert', 'usuarios', userID]);
        console.log(`Usuário cadastrado com sucesso.`);
    } catch (err) {
        console.log(`Erro ao cadastrar um novo usuário: ${err}`);
    } 
}