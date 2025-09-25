const db = require('../config/db');

const PaginaModel = {
    async findAll({ limit, offset }) {
        const { rows } = await db.query(
            'SELECT * FROM paginas ORDER BY id LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        return rows;
    },

    async countAll() {
        const { rows } = await db.query('SELECT COUNT(*) AS total FROM paginas');
        return parseInt(rows[0].total, 10);
    },

    async findById(id) {
        const { rows } = await db.query('SELECT * FROM paginas WHERE id = $1', [id]);
        return rows[0];
    },

    async create({ descricao, link_pagina }) {
        const { rows } = await db.query(
            `INSERT INTO paginas (descricao, link_pagina, ativo)
            VALUES ($1, $2, true) RETURNING *`,
            [descricao, link_pagina]
        );
        return rows[0];
    },

    async update(id, { descricao, link_pagina, ativo }) {
        const { rows } = await db.query(
            `UPDATE paginas
            SET descricao = $1, link_pagina = $2, ativo = $3
            WHERE id = $4 RETURNING *`,
            [descricao, link_pagina, ativo, id]
        );
        return rows[0];
    },

    async softDelete(id) {
        const { rows } = await db.query(
            `UPDATE paginas SET ativo = false WHERE id = $1 RETURNING *`,
            [id]
        );
        return rows[0];
    }
};

module.exports = PaginaModel;
