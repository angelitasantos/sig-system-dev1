const tipoComexModel = require('../models/tipoComexModel');
const apiResponse = require('../../../utils/apiResponse');

const tipoComexController = {
    listar: async (req, res) => {
        try {
            const tipos_comex = await tipoComexModel.findAll();
            return apiResponse.success(res, tipos_comex);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    buscar: async (req, res) => {
        try {
            const { id } = req.params;
            const tipo_comex = await tipoComexModel.findById(id);
            if (!tipo_comex) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, tipo_comex);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    criar: async (req, res) => {
        try {
            const { descricao } = req.body;
            const tipo_comex = await tipoComexModel.create(descricao);
            return apiResponse.created(res, tipo_comex);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricao } = req.body;
            const tipo_comex = await tipoComexModel.update(id, descricao);
            if (!tipo_comex) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, tipo_comex, 'Registro atualizado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    desativar: async (req, res) => {
        try {
            const { id } = req.params;
            const tipo_comex = await tipoComexModel.softDelete(id);
            if (!tipo_comex) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, tipo_comex, 'Registro desativado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },
};

module.exports = tipoComexController;