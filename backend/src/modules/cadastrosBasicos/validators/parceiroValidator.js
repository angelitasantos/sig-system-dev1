const { body } = require('express-validator');
const { handleValidationErrors } = require('../../../validators/commonRules');
const sanitizers = require('../../../validators/sanitizers');

const parceiroValidator = [
    body('nome')
        .notEmpty().withMessage('Nome é obrigatório!')
        .isLength({ min: 2 }).withMessage('Nome muito curto!'),
    sanitizers.removeAccents('nome'),

    body('cnpj_cpf')
        .notEmpty().withMessage('CNPJ/CPF é obrigatório')
        .customSanitizer(val => (val || '').toString().replace(/\D/g, ''))
        .isLength({ min: 11, max: 14 }).withMessage('CNPJ/CPF inválido!'),

    body('nome_completo')
        .notEmpty().withMessage('Nome completo é obrigatório!')
        .isLength({ min: 2 }).withMessage('Nome completo muito curto!'),
    sanitizers.removeAccents('nome_completo'),

    handleValidationErrors
];

module.exports = parceiroValidator;
