import { type Request, type Response ,type NextFunction } from "express";

export default function registrarRequisicao(req: Request, _res: Response, next: NextFunction) {
    const metodo = req.method;

    const route = req.originalUrl;

    console.log(`[Method: ${metodo} - Route: ${route}]`);

    next();
}