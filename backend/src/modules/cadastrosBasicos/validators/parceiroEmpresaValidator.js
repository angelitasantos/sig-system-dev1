const { body } = require('express-validator');
const { handleValidationErrors } = require('../../../validators/commonRules');
const sanitizers = require('../../../validators/sanitizers');

const parceiroEmpresaValidator = [
    body('parceiro_id')
        .notEmpty().withMessage('parceiro_id é obrigatório!')
        .isInt().withMessage('parceiro_id deve ser um inteiro!'),

    body('empresa_id')
        .notEmpty().withMessage('empresa_id é obrigatório!')
        .isInt().withMessage('empresa_id deve ser um inteiro!'),

    body('sigla_import')
        .notEmpty().withMessage('Sigla de importação é obrigatória!')
        .isLength({ max: 10 }).withMessage('Sigla muito longa!'),
    sanitizers.removeAccents('sigla_import'),

    body('sigla_export')
        .notEmpty().withMessage('Sigla de exportação é obrigatória!')
        .isLength({ max: 10 }).withMessage('Sigla muito longa!'),
    sanitizers.removeAccents('sigla_export'),

    handleValidationErrors
];

module.exports = parceiroEmpresaValidator;
