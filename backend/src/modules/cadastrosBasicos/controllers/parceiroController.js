const ParceiroModel = require('../models/parceiroModel');
const apiResponse = require('../../../utils/apiResponse');

const parceiroController = {
    async listar(req, res) {
        try {
            // defaults: page=1, limit=100
            const { page = 1, limit = 100, sort = 'nome', order = 'asc', search = '' } = req.query;
            const result = await ParceiroModel.getAll({ page, limit, sort, order, search });
            return apiResponse.success(res, result, 'Parceiros listados com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao listar parceiros', 500, [err.message]);
        }
    },

    async buscarPorId(req, res) {
        try {
            const parceiro = await ParceiroModel.getById(req.params.id);
            if (!parceiro) return apiResponse.error(res, 'Parceiro não encontrado!', 404);
            return apiResponse.success(res, parceiro);
        } catch (err) {
            return apiResponse.error(res, 'Erro ao buscar parceiro!', 500, [err.message]);
        }
    },

    async criar(req, res) {
        try {
            const novo = await ParceiroModel.create(req.body);
            return apiResponse.created(res, novo, 'Parceiro criado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao criar parceiro!', 500, [err.message]);
        }
    },

    async atualizar(req, res) {
        try {
            const atualizado = await ParceiroModel.update(req.params.id, req.body);
            if (!atualizado) return apiResponse.error(res, 'Parceiro não encontrado!', 404);
            return apiResponse.success(res, atualizado, 'Parceiro atualizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao atualizar parceiro!', 500, [err.message]);
        }
    },

    async deletar(req, res) {
        try {
            const inativo = await ParceiroModel.softDelete(req.params.id);
            if (!inativo) return apiResponse.error(res, 'Parceiro não encontrado!', 404);
            return apiResponse.success(res, inativo, 'Parceiro desativado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao desativar parceiro!', 500, [err.message]);
        }
    }
};

module.exports = parceiroController;
