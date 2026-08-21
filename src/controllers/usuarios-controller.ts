import type { Request, Response } from "express";
import { listarUsuariosService, cadastrarUsuarioService } from "../services/usuarios-services.js";

export async function listarUsuariosController(_req: Request, res: Response): Promise<Response> {
    const resposta = await listarUsuariosService();

    return res.status(200).json(resposta);
}

export async function cadastrarUsuariosController(req: Request, res: Response): Promise<Response> {
    const dados = req.body;

    const resposta = await cadastrarUsuarioService(dados);

    return res.status(201).json(resposta);
}