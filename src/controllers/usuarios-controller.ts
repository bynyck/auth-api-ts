import type { Request, Response } from "express";
import { listarUsuariosService, cadastrarUsuarioService } from "../services/usuarios-services.js";
import type { DadosCadastroUsuario } from "../schemas/usuario-schema.js";

export async function listarUsuariosController(_req: Request, res: Response): Promise<Response> {
    const resposta = await listarUsuariosService();

    return res.status(200).json(resposta);
}

export async function cadastrarUsuariosController(req: Request, res: Response): Promise<Response> {
    const dados = req.dadosValidados?.body as DadosCadastroUsuario;

    const resposta = await cadastrarUsuarioService(dados);

    return res.status(201).json(resposta);
}