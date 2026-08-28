import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { listarUsuariosRepository, cadastrarUsuarioRepository, buscarUsuarioPorEmail, buscarUsuarioParaAutenticacaoPorEmail } from "../repositories/usuario-repository.js";
import type {DadosNovoUsuario, RespostaLogin, UsuarioPublico } from "../types/usuario.js";
import { ErroAplicacao } from "../errors/erro-aplicacao.js";
import type {DadosCadastroUsuario ,DadosLoginUsuario } from "../schemas/usuario-schema.js";
import { criarSessaoRepository } from "../repositories/sessao-repository.js";
import type { DadosNovaSessao } from "../types/sessao.js";

function gerarTokenSessao(): string {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
}

function gerarHashToken(token: string): string {
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    return hashToken;
}

function gerarExpiraEm(): Date {
    const diasParaExpirar = 7;
    const dataExpiracao = new Date();

    dataExpiracao.setDate(dataExpiracao.getDate() + diasParaExpirar);

    return dataExpiracao;
}

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

    const token = gerarTokenSessao();

    const tokenHash = gerarHashToken(token);

    const expiraEm = gerarExpiraEm();

    const sessao: DadosNovaSessao = {
        usuarioId: usuarioEncontrado.id,
        tokenHash: tokenHash,
        expiraEm: expiraEm
    }

    await criarSessaoRepository(sessao);

    return {
        sucesso: true,
        mensagem: "Usuário validado",
        token
    }
}