const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /db-test
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as now');
        res.json({
        message: 'Conexão com banco bem-sucedida 🚀!',
        time: result.rows[0].now,
        });
    } catch (err) {
        console.error('Erro na consulta:', err);
        res.status(500).json({ error: 'Erro ao conectar ao banco!' });
    }
});

module.exports = router;
