const { validationResult } = require('express-validator');
const apiResponse = require('./apiResponse');

function validationMiddleware(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return apiResponse.error(res, 'Erro de validação!', 400, errors.array().map(err => err.msg));
    }

    next();
}

module.exports = validationMiddleware;
