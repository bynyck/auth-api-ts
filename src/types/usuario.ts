export interface Usuario {
    readonly id: number;
    nome: string;
    email: string;
    senhaHash: string;
    criadoEm: Date;
}

export type DadosNovoUsuario = Omit<Usuario, "id" | "criadoEm">;

export type UsuarioPublico = Omit<Usuario, "senhaHash">;

export type UsuarioAutenticacao = Pick<Usuario, "id" | "email" | "senhaHash">;

export type RespostaLogin = {
    sucesso: boolean,
    mensagem: string
}