import { ErroAplicacao } from "../errors/erro-aplicacao.js";
import type { Request, Response, NextFunction } from "express";

export function tratarErros(erro: unknown, _req: Request, res: Response, _next: NextFunction) {

    if(erro instanceof ErroAplicacao) {
        return res.status(erro.statusCode).json({
            sucesso: false,
            mensagem: erro.message
        })
    }

    console.error("Erro não tratado: ", erro);

    return res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno no servidor"
    });
    
}