import type { DadosNovoUsuario, UsuarioPublico } from "../types/usuario.js";
import { pool } from "../database/db.js";

export async function listarUsuariosRepository(): Promise<UsuarioPublico[]> {
    const resultado = await pool.query<UsuarioPublico>(`
        SELECT 
        id,
        nome,
        email,
        criado_em as "criadoEm"
        FROM usuarios;
    `);

    return resultado.rows;
}

export async function buscarUsuarioPorEmail(email: string): Promise<UsuarioPublico | null> {
    const resultado = await pool.query<UsuarioPublico>(`
        SELECT
        id,
        nome,
        email,
        criado_em as "criadoEm" 
        FROM usuarios WHERE email = $1`, [email]);

    return resultado.rows[0] ?? null;
}

export async function cadastrarUsuarioRepository(dados: DadosNovoUsuario): Promise<UsuarioPublico> {
    const { nome, email, senhaHash } = dados;

    const resultado = await pool.query<UsuarioPublico>(`
        INSERT INTO usuarios(nome,email,senha_hash)
        VALUES($1, $2, $3) 
        RETURNING
            id,
            nome,
            email,
            criado_em as "criadoEm";
    `,[nome,email,senhaHash]);
    
    const usuario = resultado.rows[0];

    if(!usuario) {
        throw new Error("Falha ao cadastrar usuário");
    }

    return usuario;
}