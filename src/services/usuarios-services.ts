import bcrypt from "bcryptjs";
import { listarUsuariosRepository, cadastrarUsuarioRepository, buscarUsuarioPorEmail } from "../repositories/usuario-repository.js";
import type { DadosCadastroUsuario, DadosNovoUsuario, UsuarioPublico } from "../types/usuario.js";
import { ErroAplicacao } from "../errors/erro-aplicacao.js";

export async function listarUsuariosService() {
    const usuarios = await listarUsuariosRepository();

    if(usuarios.length === 0) {
        return {
            sucesso: true,
            mensagem: "Nenhum usuário cadastrado",
            usuarios: []
        }
    }

    return {
        sucesso: true,
        mensagem: "Usuarios encontrados com sucesso",
        usuarios
    }
} 

export async function cadastrarUsuarioService(dados: DadosCadastroUsuario): Promise<UsuarioPublico> {
    const { nome, email, senha } = dados

    const emailExiste = await buscarUsuarioPorEmail(email);

    if(emailExiste) {
        throw new ErroAplicacao("E-mail já cadastrado", 409);
    }

    const senhaHash = await bcrypt.hash(senha,12);

    const dadosNovoUsuario: DadosNovoUsuario = {
        nome,
        email,
        senhaHash
    }

    const usuario = await cadastrarUsuarioRepository(dadosNovoUsuario);

    return usuario;
}