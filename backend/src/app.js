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

// Acesso & Segurança
const grupoRoutes = require('./routes/grupoRoutes');
const paginaRoutes = require('./routes/paginaRoutes');
const grupoPaginaRoutes = require('./routes/grupoPaginaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const empresaRoutes = require('./routes/empresaRoutes');

app.use('/grupos', grupoRoutes);
app.use('/paginas', paginaRoutes);
app.use('/grupos-paginas', grupoPaginaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/empresas', empresaRoutes);

// Cadastros Básicos
const categoriaRoutes = require('./modules/cadastrosBasicos/routes/categoriaRoutes');
const modalRoutes = require('./modules/cadastrosBasicos/routes/modalRoutes');
const servicoRoutes = require('./modules/cadastrosBasicos/routes/servicoRoutes');
const statusProcessoRoutes = require('./modules/cadastrosBasicos/routes/statusProcessoRoutes');
const tipoServicoRoutes = require('./modules/cadastrosBasicos/routes/tipoServicoRoutes');
const tipoComexRoutes = require('./modules/cadastrosBasicos/routes/tipoComexRoutes');
const parceiroRoutes = require('./modules/cadastrosBasicos/routes/parceiroRoutes');
const parceiroEmpresaRoutes = require('./modules/cadastrosBasicos/routes/parceiroEmpresaRoutes');

app.use('/categorias', categoriaRoutes);
app.use('/modais', modalRoutes);
app.use('/servicos', servicoRoutes);
app.use('/status-processos', statusProcessoRoutes);
app.use('/tipos-servico', tipoServicoRoutes);
app.use('/tipos-comex', tipoComexRoutes);
app.use('/parceiros', parceiroRoutes);
app.use('/parceiros-empresas', parceiroEmpresaRoutes);

// Operacional
const processoRoutes = require('./modules/operacional/routes/processoRoutes');

app.use('/processos', processoRoutes);

// Rota de teste DB
app.use('/db-test', dbTestRoutes);

// Middleware de erros
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
