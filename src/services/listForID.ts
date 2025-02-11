import { conectandoAoBanco } from "../config/configBD";

export async function listarUserOuEventoPorID(tabela: 'eventos' | 'usuarios', id: number): Promise<void> {
    const db = await conectandoAoBanco();

    const query = `
        SELECT * FROM ${tabela}
        WHERE id = ?
    `;

    try {
        const result = await db.get(query, [id]);

        if (!result) {
            console.log(`${tabela === 'eventos' ? 'Evento' : 'Usuário'} com ID ${id} não existe.`);
            return;
        }

        console.log(`${tabela === 'eventos' ? 'Evento' : 'Usuário'} encontrado: `, result);
    } catch (erro) {
        console.log(`Erro ao listar ${tabela === 'eventos' ? 'evento' : 'usuário'}: `, erro);
    }
}