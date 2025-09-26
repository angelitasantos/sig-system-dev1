const servicoModel = require('../models/servicoModel');
const apiResponse = require('../../../utils/apiResponse');

const servicoController = {
    listar: async (req, res) => {
        try {
            const servicos = await servicoModel.findAll();
            return apiResponse.success(res, servicos);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    buscar: async (req, res) => {
        try {
            const { id } = req.params;
            const servico = await servicoModel.findById(id);
            if (!servico) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, servico);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    criar: async (req, res) => {
        try {
            const { descricao } = req.body;
            const servico = await servicoModel.create(descricao);
            return apiResponse.created(res, servico);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricao } = req.body;
            const servico = await servicoModel.update(id, descricao);
            if (!servico) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, servico, 'Registro atualizado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    desativar: async (req, res) => {
        try {
            const { id } = req.params;
            const servico = await servicoModel.softDelete(id);
            if (!servico) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, servico, 'Registro desativado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },
};

module.exports = servicoController;
