import express from "express";
import registrarRequisicao from "./middlewares/registrar-requisicao.js";

export default function createApp() {

    const app = express();

    app.use(express.json());

    app.use(registrarRequisicao);

    app.get("/", (req,res) => {
        return res.send("Hello World");
    })

    return app;

}
