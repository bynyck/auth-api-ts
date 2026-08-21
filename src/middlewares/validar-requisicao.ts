import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodType } from "zod";
import { ErroAplicacao } from "../errors/erro-aplicacao.js";

type OrigemValidacao = "body" | "params" | "query";

export function validarRequisicao(schema: ZodType, origem: OrigemValidacao): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction): void =>  {
        const resultado = schema.safeParse(req[origem]);

        if(!resultado.success) {
            const erroValidacao: ErroAplicacao = new ErroAplicacao("Os dados enviados são inválidos", 400);
            return next(erroValidacao);
        }

        req.dadosValidados ??= {};

        req.dadosValidados[origem] = resultado.data;

        next();
        
    }
}