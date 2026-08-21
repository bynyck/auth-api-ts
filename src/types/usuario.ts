export interface Usuario {
    readonly id: number;
    nome: string;
    email: string;
    senhaHash: string;
    criadoEm: Date;
}

export type DadosCadastroUsuario = Omit<Usuario, "id" | "senhaHash" | "criadoEm"> & { senha: string };

export type DadosNovoUsuario = Omit<Usuario, "id" | "criadoEm">;

export type UsuarioPublico = Omit<Usuario, "senhaHash">;