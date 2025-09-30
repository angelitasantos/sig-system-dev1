const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');
const apiResponse = require('../utils/apiResponse');
const { capitalizeWords, removeAccents } = require('../utils/textFormatter');
const { getPaginationParams, buildPaginatedResponse } = require('../utils/pagination');

const usuarioController = {
    async listar(req, res) {
        try {
        const { page, limit, offset } = getPaginationParams(req);
        const data = await UsuarioModel.findAll({ limit, offset });
        const total = await UsuarioModel.countAll();

        return apiResponse.success(
            res,
            buildPaginatedResponse(data, total, page, limit),
            'Registros listados com sucesso!'
        );
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.findById(id);
            if (!usuario) return apiResponse.error(res, 'Usuário não encontrado!', 404);

            return apiResponse.success(res, usuario, 'Usuário encontrado!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async registrar(req, res) {
        try {
            const { nome, email, senha, grupo_id } = req.body;
            const existente = await UsuarioModel.findByEmail(email);
            if (existente) return apiResponse.error(res, 'Email já registrado!', 400);

            const senha_hash = await bcrypt.hash(senha, 10);
            const novo = await UsuarioModel.create({ nome, email, senha_hash, grupo_id });

            return apiResponse.success(res, novo, 'Registro adicionado com sucesso!', 201);
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, grupo_id, ativo } = req.body;
            const atualizado = await UsuarioModel.update(id, { nome, email, grupo_id, ativo });

            if (!atualizado) return apiResponse.error(res, 'Registro não encontrado!', 404);
            return apiResponse.success(res, atualizado, 'Registro atualizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async editarPerfil(req, res) {
        try {
            const userId = req.user.id; // do token
            const { nome, email } = req.body;
            const atualizado = await UsuarioModel.update(userId, { nome, email, grupo_id: null, ativo: true });

            if (!atualizado) return apiResponse.error(res, 'Registro não encontrado!', 404);
            return apiResponse.success(res, atualizado, 'Registro atualizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async trocarSenha(req, res) {
        try {
            const userId = req.user.id;;
            const { senhaAtual, novaSenha } = req.body;

            const usuario = await UsuarioModel.findById(userId);
            if (!usuario) return apiResponse.error(res, 'Registro não encontrado!', 404);

            const valido = await bcrypt.compare(senhaAtual, usuario.senha_hash);
            if (!valido) return apiResponse.error(res, 'Senha atual incorreta!', 400);

            const senha_hash = await bcrypt.hash(novaSenha, 10);
            await UsuarioModel.updateSenha(userId, senha_hash);

            return apiResponse.success(res, null, 'Senha alterada com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await UsuarioModel.findByEmail(email);

            if (!usuario) return apiResponse.error(res, 'Registro não encontrado!', 404);

            const valido = await bcrypt.compare(senha, usuario.senha_hash);
            if (!valido) return apiResponse.error(res, 'Senha incorreta!', 401);

            const token = jwt.sign(
                { userId: usuario.id, grupoId: usuario.grupo_id },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            return apiResponse.success(res, { token }, 'Login realizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async logout(req, res) {
        try {
            return apiResponse.success(res, null, 'Logout realizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const excluido = await UsuarioModel.softDelete(id);
            if (!excluido) return apiResponse.error(res, 'Registro não encontrado!', 404);

            return apiResponse.success(res, excluido, 'Registro desativado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async getPermissoes(req, res) {
        try {
            const { id } = req.params;

            const usuario = await UsuarioModel.findById(id);
            if (!usuario) {
                return apiResponse.error(res, 'Usuário não encontrado!', 404);
            }

            const grupo = await UsuarioModel.findGrupoByUsuarioId(id);
            const paginas = await UsuarioModel.findPermissoesByUsuarioId(id);

            return apiResponse.success(res, {
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    grupo: grupo ? grupo.descricao : null
                },
                paginas
            }, 'Permissões carregadas com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async getMinhasPermissoes(req, res) {
        try {
            const userId = req.user.id;;

            const usuario = await UsuarioModel.findById(userId);
            if (!usuario) {
                return apiResponse.error(res, 'Usuário não encontrado!', 404);
            }

            const grupo = await UsuarioModel.findGrupoByUsuarioId(userId);
            const paginas = await UsuarioModel.findPermissoesByUsuarioId(userId);

            return apiResponse.success(res, {
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    grupo: grupo ? grupo.descricao : null
                },
                paginas
            }, 'Permissões do usuário logado carregadas com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    }
};

module.exports = usuarioController;
