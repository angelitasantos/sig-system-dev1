const db = require('../config/db');

const GrupoModel = {
    async findAll() {
        const { rows } = await db.query('SELECT * FROM grupos ORDER BY id');
        return rows;
    },

    async findById(id) {
        const { rows } = await db.query('SELECT * FROM grupos WHERE id = $1', [id]);
        return rows[0];
    },

    async create({ descricao }) {
        const { rows } = await db.query(
            'INSERT INTO grupos (descricao, ativo) VALUES ($1, true) RETURNING *',
            [descricao]
        );
        return rows[0];
    },

    async update(id, { descricao, ativo }) {
        const { rows } = await db.query(
            `UPDATE grupos 
            SET descricao = $1, ativo = $2
            WHERE id = $3 RETURNING *`,
            [descricao, ativo, id]
        );
        return rows[0];
    },

    async softDelete(id) {
        const { rows } = await db.query(
            `UPDATE grupos SET ativo = false WHERE id = $1 RETURNING *`,
            [id]
        );
        return rows[0];
    }
};

module.exports = GrupoModel;
