import express from "express";
import registrarRequisicao from "./middlewares/registrar-requisicao.js";
import { usuarioRoutes } from "./routes/usuarios-routes.js";
import { rotaNaoEncontrada } from "./middlewares/rota-nao-encontrada.js";
import { tratarErros } from "./middlewares/tratar-erros.js";

export default function createApp() {

    const app = express();

    app.use(express.json());

    app.use(registrarRequisicao);

    app.get("/", (req,res) => {
        return res.send("Hello World");
    })

    app.use("/usuarios", usuarioRoutes);

    app.use(rotaNaoEncontrada);

    app.use(tratarErros);

    return app;

}
