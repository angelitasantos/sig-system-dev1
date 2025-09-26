const statusProcessoModel = require('../models/statusProcessoModel');
const apiResponse = require('../../../utils/apiResponse');

const statusProcessoController = {
    listar: async (req, res) => {
        try {
            const status_processo = await statusProcessoModel.findAll();
            return apiResponse.success(res, status_processo);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    buscar: async (req, res) => {
        try {
            const { id } = req.params;
            const status_processo = await statusProcessoModel.findById(id);
            if (!status_processo) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, status_processo);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    criar: async (req, res) => {
        try {
            const { descricao } = req.body;
            const status_processo = await statusProcessoModel.create(descricao);
            return apiResponse.created(res, status_processo);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricao } = req.body;
            const status_processo = await statusProcessoModel.update(id, descricao);
            if (!status_processo) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, status_processo, 'Registro atualizado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    desativar: async (req, res) => {
        try {
            const { id } = req.params;
            const status_processo = await statusProcessoModel.softDelete(id);
            if (!status_processo) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, status_processo, 'Registro desativado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },
};

module.exports = statusProcessoController;
