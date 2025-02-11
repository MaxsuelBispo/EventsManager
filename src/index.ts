import { criarTabelas } from "./services/createTable";
import { deletarUserOuEvento } from "./services/delete";
import { alterEvento } from "./services/editEvent";
import { alterUsuario } from "./services/editarUsuario";
import { listarUserOuEventoPorID } from "./services/listForID";
import { listarUsuariosOuEventos } from "./services/listarTodos";
import { cadastrarUsuario } from "./utils/recordUser";
import { registrarEventos } from "./utils/registerEvent";


// Exemplos de uso
async function main() {
    await criarTabelas();
    await cadastrarUsuario('Maria Gimenez', 'majuzinha@gmail.com', 'mariazinha123321@#');
    await registrarEventos('Festival Literário Dom Bosco', '19/03/2025', 1);
    await listarUsuariosOuEventos("eventos");
    await listarUserOuEventoPorID("eventos", 2);
    await alterUsuario(1, 'Gabriel Almeida', 'almeida@gmail.com', 'gabigol33445566@');
    await alterEvento(1, 'Festa Junina', '21/10/2025');
    await deletarUserOuEvento('eventos', 3);
}

main();