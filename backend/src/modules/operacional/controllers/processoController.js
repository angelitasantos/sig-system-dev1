const db = require('../../../config/db');
const apiResponse = require('../../../utils/apiResponse');
const EmpresaModel = require('../../../models/empresaModel');
const ProcessoModel = require('../models/processoModel');

const processoController = {
    // Listagem paginada
    async listar(req, res) {
        try {
            const { page = 1, limit = 100, ...filtros } = req.query;
            const offset = (page - 1) * limit;

            const processos = await ProcessoModel.getAllPaginated(filtros, limit, offset);
            return apiResponse.success(res, processos, 'Processos listados com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao listar processos!', 500, err);
        }
    },

    // Buscar por ID
    async buscar(req, res) {
        try {
            const { id } = req.params;
            const processo = await ProcessoModel.getById(id);

            if (!processo) {
                return apiResponse.error(res, 'Processo não encontrado!', 404);
            }

            return apiResponse.success(res, processo, 'Processo encontrado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao buscar processo!', 500, err);
        }
    },

    // Criar processo
    async criar(req, res) {
        const client = await db.connect();
        try {
            await client.query('BEGIN');

            const data = req.body;

            // --- Sequência ---
            let sequencia = await EmpresaModel.findSequencia(data.empresa_id);
            const empresa = await EmpresaModel.findById(data.empresa_id);

            if (!sequencia) {
                sequencia = await EmpresaModel.createSequencia(data.empresa_id, empresa.numero_inicial);
            }

            let novoNumero = Math.max(sequencia.ultimo_numero + 1, empresa.numero_inicial);
            await EmpresaModel.updateSequencia(data.empresa_id, novoNumero);

            const numero_processo = `${empresa.sigla_importacao || empresa.sigla_exportacao || 'PROC'}-${novoNumero}/${new Date().getFullYear().toString().slice(-2)}`;

            // --- Validação de ref_parceiro ---
            if (data.ref_parceiro) {
                const { rows: prefixos } = await client.query(`SELECT descricao FROM prefixos_ref_parceiro WHERE ativo = TRUE`);

                const prefixoEncontrado = prefixos.find(p => data.ref_parceiro.includes(p.descricao));
                if (prefixoEncontrado) {
                    const duplicados = await ProcessoModel.getByRefParceiro(data.ref_parceiro);
                    if (duplicados.length > 0) {
                        await client.query('ROLLBACK');
                        return apiResponse.error(
                            res,
                            'Referência já existe em outro processo!',
                            409,
                            duplicados
                        );
                    }
                }
            }

            const novoProcesso = await ProcessoModel.create({
                ...data,
                numero_processo
            });

            await client.query('COMMIT');
            return apiResponse.created(res, novoProcesso, 'Processo criado com sucesso!');
        } catch (err) {
            await client.query('ROLLBACK');
            return apiResponse.error(res, 'Erro ao criar processo!', 500, err);
        } finally {
            client.release();
        }
    },

    // Atualizar processo
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            // --- Validação de ref_parceiro ---
            if (data.ref_parceiro) {
                const prefixos = await db.query(`SELECT descricao FROM prefixos_ref_parceiro WHERE ativo = TRUE`);
                const prefixoEncontrado = prefixos.rows.find(p => data.ref_parceiro.includes(p.descricao));

                if (prefixoEncontrado) {
                    const duplicados = await ProcessoModel.getByRefParceiro(data.ref_parceiro);
                    const outro = duplicados.find(proc => proc.id !== parseInt(id, 10));
                    if (outro) {
                        return apiResponse.error(
                            res,
                            'Referência já existe em outro processo!',
                            409,
                            duplicados
                        );
                    }
                }
            }

            const atualizado = await ProcessoModel.update(id, data);

            if (!atualizado) {
                return apiResponse.error(res, 'Processo não encontrado!', 404);
            }

            return apiResponse.success(res, atualizado, 'Processo atualizado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao atualizar processo!', 500, err);
        }
    },

    // Soft delete
    async desativar(req, res) {
        try {
            const { id } = req.params;
            const desativado = await ProcessoModel.desativar(id);

            if (!desativado) {
                return apiResponse.error(res, 'Processo não encontrado!', 404);
            }

            return apiResponse.success(res, desativado, 'Processo desativado com sucesso!');
        } catch (err) {
            return apiResponse.error(res, 'Erro ao desativar processo!', 500, err);
        }
    }
};

module.exports = processoController;
