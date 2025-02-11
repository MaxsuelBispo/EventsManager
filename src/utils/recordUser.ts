import { Usuarios } from "../models/users";
import { inserirUsuario } from "../services/inserirUsuario";



export async function cadastrarUsuario(nome: string, email: string, senha: string): Promise<void> {
    const novoUsuario: Usuarios = {
        nome: nome,
        email: email,
        senha: senha
    };

    await inserirUsuario(novoUsuario);
}