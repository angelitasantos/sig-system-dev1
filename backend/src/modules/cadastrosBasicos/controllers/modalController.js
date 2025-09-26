const modalModel = require('../models/modalModel');
const apiResponse = require('../../../utils/apiResponse');

const modalController = {
    listar: async (req, res) => {
        try {
            const modais = await modalModel.findAll();
            return apiResponse.success(res, modais);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    buscar: async (req, res) => {
        try {
            const { id } = req.params;
            const modal = await modalModel.findById(id);
            if (!modal) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, modal);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    criar: async (req, res) => {
        try {
            const { descricao } = req.body;
            const modal = await modalModel.create(descricao);
            return apiResponse.created(res, modal);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricao } = req.body;
            const modal = await modalModel.update(id, descricao);
            if (!modal) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, modal, 'Registro atualizado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    desativar: async (req, res) => {
        try {
            const { id } = req.params;
            const modal = await modalModel.softDelete(id);
            if (!modal) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, modal, 'Registro desativado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },
};

module.exports = modalController;
