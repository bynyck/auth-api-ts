import { z } from "zod";

export const cadastrarUsuarioSchema = z.strictObject({
    nome: z.string().trim().min(3, "Nome deve ter no minimo 3 caracteres"),
    email: z.email("E-mail inválido"),
    senha: z.string().min(4, "Senha deve ter no mínimo 4 caracteres")
})


export type DadosCadastroUsuario = z.infer<typeof cadastrarUsuarioSchema>;