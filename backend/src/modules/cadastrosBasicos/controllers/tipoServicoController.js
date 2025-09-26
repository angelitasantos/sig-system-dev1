const tipoServicoModel = require('../models/tipoServicoModel');
const apiResponse = require('../../../utils/apiResponse');

const tipoServicoController = {
    listar: async (req, res) => {
        try {
            const tipos_servico = await tipoServicoModel.findAll();
            return apiResponse.success(res, tipos_servico);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    buscar: async (req, res) => {
        try {
            const { id } = req.params;
            const tipo_servico = await tipoServicoModel.findById(id);
            if (!tipo_servico) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, tipo_servico);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    criar: async (req, res) => {
        try {
            const { descricao } = req.body;
            const tipo_servico = await tipoServicoModel.create(descricao);
            return apiResponse.created(res, tipo_servico);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricao } = req.body;
            const tipo_servico = await tipoServicoModel.update(id, descricao);
            if (!tipo_servico) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, tipo_servico, 'Registro atualizado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    desativar: async (req, res) => {
        try {
            const { id } = req.params;
            const tipo_servico = await tipoServicoModel.softDelete(id);
            if (!tipo_servico) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, tipo_servico, 'Registro desativado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },
};

module.exports = tipoServicoController;