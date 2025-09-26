const GrupoPagina = require('../models/grupoPaginaModel');
const apiResponse = require('../utils/apiResponse');
const { getPaginationParams, buildPaginatedResponse } = require('../utils/pagination');

const grupoPaginaController = {
    async listar(req, res) {
        try {
            const { page, limit, offset } = getPaginationParams(req);
            const data = await GrupoPagina.findAll({ limit, offset });
            const total = await GrupoPagina.countAll();

            return apiResponse.success(
                res,
                buildPaginatedResponse(data, total, page, limit),
                'Associações grupo-página listadas com sucesso!'
            );
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const registro = await GrupoPagina.findById(id);
            if (!registro) {
                return apiResponse.error(res, 'Associação não encontrada!', 404);
            }
            return apiResponse.success(res, registro, 'Associação encontrada!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async criar(req, res) {
        try {
            const { grupo_id, pagina_id } = req.body;
            const novo = await GrupoPagina.create({ grupo_id, pagina_id });
            return apiResponse.success(res, novo, 'Associação criada com sucesso!', 201);
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { grupo_id, pagina_id, ativo } = req.body;
            const atualizado = await GrupoPagina.update(id, { grupo_id, pagina_id, ativo });

            if (!atualizado) {
                return apiResponse.error(res, 'Associação não encontrada!', 404);
            }
            return apiResponse.success(res, atualizado, 'Associação atualizada com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const excluido = await GrupoPagina.softDelete(id);
            if (!excluido) {
                return apiResponse.error(res, 'Associação não encontrada!', 404);
            }
            return apiResponse.success(res, excluido, 'Associação desativada com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    }
};

module.exports = grupoPaginaController;
