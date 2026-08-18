import { Pool } from "pg"

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPort = process.env.DB_PORT;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

if(!dbHost || !dbUser || !dbPort || !dbPassword || !dbName) {
    throw new Error("Variáveis de ambiente do banco não configuradas");
}

const dbPortNumber = Number(dbPort);

if(Number.isNaN(dbPortNumber)) {
    throw new Error("DB_PORT deve ser um número válido");
}

export const pool = new Pool({
    host: dbHost,
    user: dbUser,
    port: dbPortNumber,
    password: dbPassword,
    database: dbName
})