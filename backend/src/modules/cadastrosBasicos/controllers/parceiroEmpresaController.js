const ParceiroEmpresaModel = require('../models/parceiroEmpresaModel');
const apiResponse = require('../../../utils/apiResponse');

const parceiroEmpresaController = {
    async listar(req, res, next) {
        try {
            const data = await ParceiroEmpresaModel.getAll();
            return apiResponse.success(res, data, 'Vínculos listados com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao listar vínculos!', 500, err);
        }
    },

    async buscar(req, res, next) {
        try {
            const { parceiro_id, empresa_id } = req.params;
            const vinculo = await ParceiroEmpresaModel.getById(parceiro_id, empresa_id);
            if (!vinculo) {
                return apiResponse.error(res, 'Vínculo não encontrado!', 404);
            }
            return apiResponse.success(res, vinculo, 'Vínculo encontrado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao buscar vínculo!', 500, err);
        }
    },

    async criar(req, res, next) {
        try {
            const novo = await ParceiroEmpresaModel.create(req.body);
            return apiResponse.success(res, novo, 'Vínculo criado com sucesso!', 201);
        } catch (err) {
            return apiResponse.error(res, 'Erro ao criar vínculo!', 500, err);
        }
    },

    async atualizar(req, res, next) {
        try {
            const { parceiro_id, empresa_id } = req.params;
            const atualizado = await ParceiroEmpresaModel.update(parceiro_id, empresa_id, req.body);
            if (!atualizado) {
                return apiResponse.error(res, 'Vínculo não encontrado!', 404);
            }
            return apiResponse.success(res, atualizado, 'Vínculo atualizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao atualizar vínculo!', 500, err);
        }
    },

    async deletar(req, res, next) {
        try {
            const { parceiro_id, empresa_id } = req.params;
            const apagado = await ParceiroEmpresaModel.delete(parceiro_id, empresa_id);
            if (!apagado) {
                return apiResponse.error(res, 'Vínculo não encontrado!', 404);
            }
            return apiResponse.success(res, apagado, 'Vínculo excluído com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao excluir vínculo!', 500, err);
        }
    }
};

module.exports = parceiroEmpresaController;
