const { body } = require('express-validator');
const { handleValidationErrors } = require('../../../validators/commonRules');
const sanitizers = require('../../../validators/sanitizers');

const processoValidator = [
    // tipo_operacao
    body('tipo_operacao')
        .notEmpty().withMessage('Tipo de operação é obrigatório!')
        .isIn(['IMPORTACAO', 'EXPORTACAO', 'OUTRO'])
        .withMessage('Tipo de operação deve ser IMPORTACAO, EXPORTACAO ou OUTRO!'),

    // empresa_id
    body('empresa_id')
        .notEmpty().withMessage('Empresa é obrigatória!')
        .isInt({ min: 1 }).withMessage('empresa_id deve ser um número inteiro positivo!'),

    // parceiro_id
    body('parceiro_id')
        .notEmpty().withMessage('Parceiro é obrigatório!')
        .isInt({ min: 1 }).withMessage('parceiro_id deve ser um número inteiro positivo!'),

    // usuario_id (opcional, mas se vier deve ser inteiro)
    body('usuario_id')
        .optional()
        .isInt({ min: 1 }).withMessage('usuario_id deve ser um número inteiro positivo!'),

    // tipo_servico_id (opcional)
    body('tipo_servico_id')
        .optional()
        .isInt({ min: 1 }).withMessage('tipo_servico_id deve ser um número inteiro positivo!'),

    // servico_id (opcional)
    body('servico_id')
        .optional()
        .isInt({ min: 1 }).withMessage('servico_id deve ser um número inteiro positivo!'),

    // tipo_comex_id (opcional)
    body('tipo_comex_id')
        .optional()
        .isInt({ min: 1 }).withMessage('tipo_comex_id deve ser um número inteiro positivo!'),

    // status_processo_id (opcional)
    body('status_processo_id')
        .optional()
        .isInt({ min: 1 }).withMessage('status_processo_id deve ser um número inteiro positivo!'),

    // modais_id (opcional)
    body('modais_id')
        .optional()
        .isInt({ min: 1 }).withMessage('modais_id deve ser um número inteiro positivo!'),

    // ref_parceiro
    body('ref_parceiro')
        .optional()
        .isLength({ min: 2, max: 500 }).withMessage('Referência do parceiro deve ter entre 2 e 500 caracteres!')
        .trim(),
    sanitizers.removeAccents('ref_parceiro'),

    handleValidationErrors
];

module.exports = processoValidator;
