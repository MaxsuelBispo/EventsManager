import { conectandoAoBanco } from "../config/configBD";
import { usuarioExistente } from "../utils/verify";
import zod from 'zod';

const validacao = zod.object({
    nome: zod.string().min(4, 'O nome deve conter no mínimo 4 caracteres.'),
    email: zod.string().email('Email inválido.'),
    senha: zod.string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial')
        .regex(/\d/, 'A senha deve conter pelo menos um número')
});

export async function alterUsuario(id: number, nome: string, email: string, senha: string): Promise<void> {
    const db = await conectandoAoBanco();
    const valid = validacao.safeParse({ nome, email, senha });

    if (await usuarioExistente(nome, email)) {
        console.log('Nenhuma alteração foi feita neste usuário, pois seu nome ou email já são cadastrados');
        return;
    }

    if (!valid.success) {
        console.log('Erro na validação: ', valid.error.format());
        return;
    }

    const query = `
        UPDATE usuarios
        SET nome = ?, email = ?, senha = ?
        WHERE id = ?
    `;

    try {
        const result = await db.run(query, [nome, email, senha, id]);

        if (result.changes === 0) {
            console.log('Este usuário não existe, para alterar escolha um usuário existente.');
            return;
        }

        await db.run(`INSERT INTO logs(acao, tabela_afetada, item_afetado) VALUES(?,?,?)`, ['update', 'usuarios', id]);
        console.log(`Usuário de ID ${id} alterado com sucesso.`);
    } catch (erro) {
        console.log('Erro ao tentar alterar usuário: ', erro);
    } 
}