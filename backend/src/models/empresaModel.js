const db = require('../config/db');

const EmpresaModel = {
    async findAll(limit, offset) {
        const result = await db.query(
            'SELECT * FROM empresas ORDER BY id LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        return result.rows;
    },

    async countAll() {
        const result = await db.query('SELECT COUNT(*) FROM empresas');
        return parseInt(result.rows[0].count, 10);
    },

    async findById(id) {
        const result = await db.query('SELECT * FROM empresas WHERE id = $1', [id]);
        return result.rows[0];
    },

    async create({ nome, sigla_importacao, sigla_exportacao, numero_inicial, cnpj, nome_completo }) {
        const result = await db.query(
            `INSERT INTO empresas 
             (nome, sigla_importacao, sigla_exportacao, numero_inicial, cnpj, nome_completo) 
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [nome, sigla_importacao, sigla_exportacao, numero_inicial, cnpj, nome_completo]
        );
        return result.rows[0];
    },

    async update(id, { nome, sigla_importacao, sigla_exportacao, numero_inicial, cnpj, nome_completo, ativo }) {
        const result = await db.query(
            `UPDATE empresas SET 
                nome = $1, sigla_importacao = $2, sigla_exportacao = $3,
                numero_inicial = $4, cnpj = $5, nome_completo = $6, ativo = $7
             WHERE id = $8 RETURNING *`,
            [nome, sigla_importacao, sigla_exportacao, numero_inicial, cnpj, nome_completo, ativo, id]
        );
        return result.rows[0];
    },

    async softDelete(id) {
        const result = await db.query(
            'UPDATE empresas SET ativo = false WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    },

    // --- Sequências ---
    async findSequencia(empresa_id) {
        const result = await db.query(
            'SELECT * FROM sequencias_processos WHERE empresa_id = $1',
            [empresa_id]
        );
        return result.rows[0];
    },

    async updateSequencia(empresa_id, novoNumero) {
        const result = await db.query(
            `UPDATE sequencias_processos 
             SET ultimo_numero = $2 
             WHERE empresa_id = $1 RETURNING *`,
            [empresa_id, novoNumero]
        );
        return result.rows[0];
    },

    async createSequencia(empresa_id, numero) {
        const result = await db.query(
            `INSERT INTO sequencias_processos (empresa_id, ultimo_numero)
             VALUES ($1, $2) RETURNING *`,
            [empresa_id, numero]
        );
        return result.rows[0];
    },
};

module.exports = EmpresaModel;
