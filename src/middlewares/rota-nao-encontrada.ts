import type { Request, Response } from "express";

export function rotaNaoEncontrada(_req: Request, res: Response): Response {

    return res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada"
    })

}