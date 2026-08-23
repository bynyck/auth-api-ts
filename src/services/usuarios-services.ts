import bcrypt from "bcryptjs";
import { listarUsuariosRepository, cadastrarUsuarioRepository, buscarUsuarioPorEmail, buscarUsuarioParaAutenticacaoPorEmail } from "../repositories/usuario-repository.js";
import type {DadosNovoUsuario, RespostaLogin, UsuarioPublico } from "../types/usuario.js";
import { ErroAplicacao } from "../errors/erro-aplicacao.js";
import type {DadosCadastroUsuario ,DadosLoginUsuario } from "../schemas/usuario-schema.js";

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

export async function loginUsuarioService(dados: DadosLoginUsuario): Promise<RespostaLogin> {
    const { email, senha } = dados;

    const usuarioEncontrado = await buscarUsuarioParaAutenticacaoPorEmail(email);

    if(!usuarioEncontrado) {
        throw new ErroAplicacao("E-mail ou senha inválidos", 401);
    }

    const senhaValidada = await bcrypt.compare(senha, usuarioEncontrado.senhaHash);

    if(!senhaValidada) {
        throw new ErroAplicacao("E-mail ou senha inválidos", 401);
    }

    return {
        sucesso: true,
        mensagem: "Usuário validado"
    }
}