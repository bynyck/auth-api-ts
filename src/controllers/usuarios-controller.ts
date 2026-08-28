import type { Request, Response } from "express";
import { listarUsuariosService, cadastrarUsuarioService, loginUsuarioService } from "../services/usuarios-services.js";
import type { DadosCadastroUsuario, DadosLoginUsuario } from "../schemas/usuario-schema.js";

export async function listarUsuariosController(_req: Request, res: Response): Promise<Response> {
    const resposta = await listarUsuariosService();

    return res.status(200).json(resposta);
}

export async function cadastrarUsuariosController(req: Request, res: Response): Promise<Response> {
    const dados = req.dadosValidados?.body as DadosCadastroUsuario;

    const resposta = await cadastrarUsuarioService(dados);

    return res.status(201).json(resposta);
}

export async function loginUsuarioController(req: Request, res: Response): Promise<Response> {
    const dados = req.dadosValidados?.body as DadosLoginUsuario;

    const resposta = await loginUsuarioService(dados);

    res.cookie("sessionToken", resposta.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        sucesso: true,
        mensagem: "Usuário validado"
    });
}