const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rota
app.get('/', (req, res) => {
    res.json({ message: 'Backend ativo e rodando 🚀' });
});

module.exports = app;
