import { pool } from "../database/db.js";
import type { DadosNovaSessao, Sessao } from "../types/sessao.js";

export async function criarSessaoRepository(dados: DadosNovaSessao): Promise<Sessao> {
    const { usuarioId, tokenHash, expiraEm } = dados;

    const resultado = await pool.query<Sessao>(`
        INSERT INTO sessoes(usuario_id, token_hash, expira_em)
        VALUES($1, $2, $3)
        RETURNING
            id,
            usuario_id as "usuarioId",
            token_hash as "tokenHash",
            criado_em as "criadoEm",
            expira_em as "expiraEm"
    `, [usuarioId, tokenHash, expiraEm]);
    
    const sessao = resultado.rows[0];

    if(!sessao) {
        throw new Error("Falha ao criar sessao");
    }

    return sessao;
}