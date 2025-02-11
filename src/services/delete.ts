import { conectandoAoBanco } from "../config/configBD";

export async function deletarUserOuEvento(tabela: 'eventos' | 'usuarios', id: number): Promise<void> {
    const db = await conectandoAoBanco();

    const query = `
        DELETE FROM ${tabela}
        WHERE id = ?
    `;

    try {
        const result = await db.run(query, [id]);

        if (result.changes === 0) {
            console.log(`${tabela === 'eventos' ? 'Evento' : 'Usuário'} com ID ${id} não existe.`);
            return;
        }

        await db.run(`INSERT INTO logs(acao, tabela_afetada, item_afetado) VALUES(?,?,?)`, ['delete', tabela, id]);
        console.log(`${tabela === 'eventos' ? 'Evento' : 'Usuário'} de ID ${id} deletado com sucesso.`);
    } catch (erro) {
        console.log(`Erro ao deletar ${tabela === 'eventos' ? 'evento' : 'usuário'}: `, erro);
    }
}