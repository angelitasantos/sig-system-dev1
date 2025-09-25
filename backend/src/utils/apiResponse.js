// Padroniza todas as respostas da API
const apiResponse = {
    success: (res, data = {}, message = 'Operação realizada com sucesso!') => {
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    },

    created: (res, data = {}, message = 'Registro criado com sucesso!') => {
        return res.status(201).json({
            success: true,
            message,
            data,
        });
    },

    error: (res, message = 'Erro interno do servidor!', code = 500, errors = []) => {
        return res.status(code).json({
            success: false,
            message,
            errors,
        });
    },
};

module.exports = apiResponse;
