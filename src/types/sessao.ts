export interface Sessao {
    id: number,
    usuarioId: number,
    tokenHash: string,
    criadoEm: Date,
    expiraEm: Date
}

export type DadosNovaSessao = Pick<Sessao, "usuarioId" | "tokenHash" | "expiraEm">;