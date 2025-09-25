const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const apiResponse = require('../utils/apiResponse');

// GET /db-test
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as now');
        return apiResponse.success(res, { time: result.rows[0].now }, 'Conexão com banco bem-sucedida 🚀!');
    } catch (err) {
        console.error('Erro na consulta:', err);
        return apiResponse.error(res, 'Erro ao conectar ao banco!', 500, [err.message]);
    }
});

module.exports = router;
