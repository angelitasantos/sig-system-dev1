const { Pool } = require('pg');
require('dotenv').config();
const path = require('path');

/**
// Debug para garantir que o .env está sendo lido
console.log("Arquivo .env carregado de:", path.resolve('.env'));
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASS:', process.env.DB_PASS ? '***' : '(não definido)');
console.log('DB_PORT:', process.env.DB_PORT);
console.log("Tipo da senha:", typeof process.env.DB_PASS);
 */

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('✅ Conectado ao PostgreSQL !'))
    .catch((err) => console.error('❌ Erro de conexão ao PostgreSQL:', err));

module.exports = pool;
