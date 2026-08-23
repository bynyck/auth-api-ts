import { Router } from "express";
import { listarUsuariosController, cadastrarUsuariosController, loginUsuarioController } from "../controllers/usuarios-controller.js";
import { validarRequisicao } from "../middlewares/validar-requisicao.js";
import { cadastrarUsuarioSchema, loginUsuarioSchema } from "../schemas/usuario-schema.js";

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

usuarioRoutes.post("/login", validarRequisicao(loginUsuarioSchema, "body") ,loginUsuarioController);