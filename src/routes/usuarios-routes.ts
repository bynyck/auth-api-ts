import { Router } from "express";
import { listarUsuariosController, cadastrarUsuariosController } from "../controllers/usuarios-controller.js";
import { validarRequisicao } from "../middlewares/validar-requisicao.js";
import { cadastrarUsuarioSchema } from "../schemas/usuario-schema.js";

export const usuarioRoutes: Router = Router();

usuarioRoutes.get(
    "/",
     listarUsuariosController
);

usuarioRoutes.post(
    "/", 
    validarRequisicao(cadastrarUsuarioSchema, "body"),
    cadastrarUsuariosController
);