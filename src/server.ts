import "dotenv/config";
import createApp from "./app.js";
import { pool } from "./database/db.js";

const app = createApp();

const port = Number(process.env.PORT) || 8080;

export async function testarConexaoBanco(): Promise<void> {
    try {
        const resposta = await pool.query("SELECT 1 AS conectado");
        console.log("PostgreSQL conectado", resposta.rows[0].conectado);
    } catch(erro: unknown) {
        if(erro instanceof Error) {
            console.error("Erro ao conectar ao PostgreSQL", erro.message);
            process.exit(1);
        }
    }
}

await testarConexaoBanco();

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
})