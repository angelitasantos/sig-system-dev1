const { body } = require('express-validator');

const commonRules = {
    nome: () =>
        body('nome')
        .notEmpty().withMessage('Nome é obrigatório!')
        .isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres!')
        .trim(),

    email: () =>
        body('email')
        .isEmail().withMessage('Email inválido!')
        .normalizeEmail(),

    telefone: () =>
        body('telefone')
        .isLength({ min: 10, max: 11 }).withMessage('Telefone deve ter entre 10 e 11 caracteres!')
        .isNumeric().withMessage('Telefone deve conter apenas números!'),

    cnpj: () =>
        body('cnpj')
        .isLength({ min: 14, max: 14 }).withMessage('CNPJ deve ter 14 caracteres!')
        .isNumeric().withMessage('CNPJ deve conter apenas números!'),

    preco: () =>
        body('preco')
        .isFloat({ min: 0.01 }).withMessage('Preço deve ser maior que zero!'),

    quantidade: () =>
        body('quantidade')
        .isInt({ min: 1 }).withMessage('Quantidade deve ser um número inteiro positivo!'),

    estoque: () =>
        body('estoque_atual')
        .isInt({ min: 0 }).withMessage('Estoque não pode ser negativo!')
};

module.exports = commonRules;
