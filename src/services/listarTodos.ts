import { conectandoAoBanco } from "../config/configBD";

export async function listarUsuariosOuEventos(tabela: 'eventos' | 'usuarios'): Promise<void> {
    const db = await conectandoAoBanco();

    const query = `
        SELECT * FROM ${tabela}
    `;

    try {
        const result = await db.all(query);
        console.log(`${tabela === 'eventos' ? 'Eventos' : 'Usuários'} encontrados: `, result);
    } catch (erro) {
        console.log(`Erro ao listar ${tabela === 'eventos' ? 'eventos' : 'usuários'}: `, erro);
    }
}