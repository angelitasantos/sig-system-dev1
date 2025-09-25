const GrupoModel = require('../models/grupoModel');
const apiResponse = require('../utils/apiResponse');
const { capitalizeWords, removeAccents } = require('../utils/textFormatter');

const grupoController = {
    async listar(req, res) {
        try {
            const grupos = await GrupoModel.findAll();
            return apiResponse.success(res, grupos, 'Registros listados com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const grupo = await GrupoModel.findById(id);
            if (!grupo) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, grupo, 'Registro encontrado!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async criar(req, res) {
        try {
            let { descricao } = req.body;
            descricao = capitalizeWords(removeAccents(descricao));
            const novoGrupo = await GrupoModel.create({ descricao });
            return apiResponse.success(res, novoGrupo, 'Registro adicionado com sucesso!', 201);
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            let { descricao, ativo } = req.body;

            if (descricao) {
                descricao = capitalizeWords(removeAccents(descricao));
            }

            const grupoAtualizado = await GrupoModel.update(id, { descricao, ativo });

            if (!grupoAtualizado) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, grupoAtualizado, 'Registro atualizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    },

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const grupoExcluido = await GrupoModel.softDelete(id);
            if (!grupoExcluido) {
                return apiResponse.error(res, 'Registro não encontrado!', 404);
            }
            return apiResponse.success(res, grupoExcluido, 'Registro desativado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, err.message, 500);
        }
    }
};

module.exports = grupoController;
