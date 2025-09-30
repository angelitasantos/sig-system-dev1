const jwt = require('jsonwebtoken');
const apiResponse = require('../utils/apiResponse');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return apiResponse.error(res, 'Token não fornecido!', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.userId,
            grupoId: decoded.grupoId,
        };
        next();
    } catch (err) {
        return apiResponse.error(res, 'Token inválido ou expirado!', 403, [err.message]);
    }
}

module.exports = authMiddleware;
