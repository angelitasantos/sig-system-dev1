const { body, validationResult } = require('express-validator');

const commonRules = {
    nome: () =>
        body('nome')
        .notEmpty().withMessage('Nome é obrigatório!')
        .isLength({ min: 2, max: 50 }).withMessage('Nome deve ter entre 2 e 50 caracteres!')
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
        .isInt({ min: 0 }).withMessage('Estoque não pode ser negativo!'),
    
    descricao: () =>
        body('descricao')
        .notEmpty().withMessage('Descrição é obrigatória!')
        .isLength({ min: 2, max: 50 }).withMessage('Descrição deve ter entre 2 e 50 caracteres!')
        .trim(),
    
    linkPaginaRule: () =>
        body('link_pagina')
        .notEmpty().withMessage('Link da página é obrigatório!')
        .isLength({ min: 5, max: 150 }).withMessage('Link deve ter entre 5 e 150 caracteres!')
        .trim(),
};

const grupoPaginaRules = [
    body('grupo_id')
        .isInt({ min: 1 }).withMessage('grupo_id deve ser um número inteiro positivo!'),
    body('pagina_id')
        .isInt({ min: 1 }).withMessage('pagina_id deve ser um número inteiro positivo!'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Erro(s) de validação!',
            errors: errors.array(),
        });
    }
    next();
};

module.exports = {
    commonRules,
    grupoPaginaRules,
    handleValidationErrors,
};
