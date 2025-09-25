const PaginaModel = require('../models/paginaModel');
const apiResponse = require('../utils/apiResponse');
const { capitalizeWords, removeAccents } = require('../utils/textFormatter');
const { getPaginationParams, buildPaginatedResponse } = require('../utils/pagination');

const paginaController = {
    async listar(req, res) {
        try {
            const { page, limit, offset } = getPaginationParams(req);
            const paginas = await PaginaModel.findAll({ limit, offset });
            const total = await PaginaModel.countAll();

            return apiResponse.success(
                res,
                buildPaginatedResponse(paginas, total, page, limit),
                'Registros listadas com sucesso!'
            );
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const pagina = await PaginaModel.findById(id);
            if (!pagina) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, pagina, 'Registro encontrado!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async criar(req, res) {
        try {
            let { descricao, link_pagina } = req.body;
            descricao = capitalizeWords(removeAccents(descricao));
            const novaPagina = await PaginaModel.create({ descricao, link_pagina });
            return apiResponse.success(res, novaPagina, 'Registro adicionado com sucesso!', 201);
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            let { descricao, link_pagina, ativo } = req.body;

            if (descricao) {
                descricao = capitalizeWords(removeAccents(descricao));
            }

            const paginaAtualizada = await PaginaModel.update(id, { descricao, link_pagina, ativo });

            if (!paginaAtualizada) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, paginaAtualizada, 'Registro atualizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const paginaExcluida = await PaginaModel.softDelete(id);
            if (!paginaExcluida) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, paginaExcluida, 'Registro desativado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    }
};

module.exports = paginaController;
