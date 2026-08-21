import { Router } from "express";
import { listarUsuariosController, cadastrarUsuariosController } from "../controllers/usuarios-controller.js";

export const usuarioRoutes: Router = Router();

usuarioRoutes.get("/", listarUsuariosController);

usuarioRoutes.post("/", cadastrarUsuariosController);
