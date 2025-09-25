const apiResponse = require('./apiResponse');

// Middleware para rotas não encontradas (404)
function notFoundHandler(req, res, next) {
    const error = new Error('Rota não encontrada!');
    error.statusCode = 404;
    next(error);
}

// Middleware de tratamento centralizado de erros
function errorHandler(err, req, res, next) {
    console.error('🔥 Erro capturado:', err);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor!';

    return apiResponse.error(res, message, statusCode, [
        err.details || 'Ocorreu um erro inesperado!',
    ]);
}

module.exports = {
    notFoundHandler,
    errorHandler,
};
