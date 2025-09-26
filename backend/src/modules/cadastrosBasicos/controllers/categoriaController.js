const categoriaModel = require('../models/categoriaModel');
const apiResponse = require('../../../utils/apiResponse');

const categoriaController = {
    listar: async (req, res) => {
        try {
            const categorias = await categoriaModel.findAll();
            return apiResponse.success(res, categorias);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    buscar: async (req, res) => {
        try {
            const { id } = req.params;
            const categoria = await categoriaModel.findById(id);
            if (!categoria) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, categoria);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    criar: async (req, res) => {
        try {
            const { descricao } = req.body;
            const categoria = await categoriaModel.create(descricao);
            return apiResponse.created(res, categoria);
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricao } = req.body;
            const categoria = await categoriaModel.update(id, descricao);
            if (!categoria) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, categoria, 'Registro atualizado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },

    desativar: async (req, res) => {
        try {
            const { id } = req.params;
            const categoria = await categoriaModel.softDelete(id);
            if (!categoria) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, categoria, 'Registro desativado com sucesso!');
        } catch (error) {
            return apiResponse.error(res, error.message);
        }
    },
};

module.exports = categoriaController;
