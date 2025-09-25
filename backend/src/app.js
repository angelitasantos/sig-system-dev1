const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dbTestRoutes = require('./routes/dbTestRoutes');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const { notFoundHandler, errorHandler } = require('./utils/errorHandler');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(loggingMiddleware);

// Rota
app.get('/', (req, res) => {
    res.json({ message: 'Backend ativo e rodando 🚀' });
});

const grupoRoutes = require('./routes/grupoRoutes');
const paginaRoutes = require('./routes/paginaRoutes');

app.use('/grupos', grupoRoutes);
app.use('/paginas', paginaRoutes);

// Rota de teste DB
app.use('/db-test', dbTestRoutes);

// Middleware de erros
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
