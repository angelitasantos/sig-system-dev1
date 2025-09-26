const EmpresaModel = require('../models/empresaModel');
const apiResponse = require('../utils/apiResponse');
const { getPaginationParams, buildPaginatedResponse } = require('../utils/pagination');

const empresaController = {
    async list(req, res) {
        try {
            const { page, limit, offset } = getPaginationParams(req);
            const empresas = await EmpresaModel.findAll(limit, offset);
            const total = await EmpresaModel.countAll();
            return apiResponse.success(res, buildPaginatedResponse(empresas, total, page, limit));
        } catch (error) {
            return apiResponse.error(res, 'Erro ao listar empresas!', 500, error.message);
        }
    },

    async getById(req, res) {
        try {
            const empresa = await EmpresaModel.findById(req.params.id);
            if (!empresa) return apiResponse.error(res, 'Empresa não encontrada!', 404);
            return apiResponse.success(res, empresa);
        } catch (error) {
            return apiResponse.error(res, 'Erro ao buscar empresa!', 500, error.message);
        }
    },

    async create(req, res) {
        try {
            const novaEmpresa = await EmpresaModel.create(req.body);
            return apiResponse.created(res, novaEmpresa, 'Empresa cadastrada com sucesso!');
        } catch (error) {
            return apiResponse.error(res, 'Erro ao criar empresa!', 500, error.message);
        }
    },

    async update(req, res) {
        try {
            const empresa = await EmpresaModel.findById(req.params.id);
            if (!empresa) return apiResponse.error(res, 'Empresa não encontrada!', 404);

            const updated = await EmpresaModel.update(req.params.id, req.body);

            // 🔹 Regra de negócio: atualizar sequências_processos se necessário
            if (req.body.numero_inicial) {
                const sequencia = await EmpresaModel.findSequencia(req.params.id);

                if (sequencia) {
                    if (req.body.numero_inicial > sequencia.ultimo_numero) {
                        await EmpresaModel.updateSequencia(req.params.id, req.body.numero_inicial);
                    }
                } else {
                    await EmpresaModel.createSequencia(req.params.id, req.body.numero_inicial);
                }
            }

            return apiResponse.success(res, updated, 'Empresa atualizada com sucesso!');
        } catch (error) {
            return apiResponse.error(res, 'Erro ao atualizar empresa!', 500, error.message);
        }
    },

    async softDelete(req, res) {
        try {
            const empresa = await EmpresaModel.softDelete(req.params.id);
            if (!empresa) return apiResponse.error(res, 'Empresa não encontrada!', 404);
            return apiResponse.success(res, empresa, 'Empresa desativada com sucesso!');
        } catch (error) {
            return apiResponse.error(res, 'Erro ao desativar empresa!', 500, error.message);
        }
    },
};

module.exports = empresaController;
