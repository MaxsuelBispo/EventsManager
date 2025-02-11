import { Evento } from "../models/event";
import { inserirEvento } from "../services/insertEvent";


export async function registrarEventos(nome: string, data: string, responsavel: number): Promise<void> {
    const novoEvento: Evento = {
        nome: nome,
        data: data,
        usuarioResponsavel: responsavel
    };

    await inserirEvento(novoEvento);
}