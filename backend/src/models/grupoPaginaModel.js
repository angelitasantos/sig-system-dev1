const db = require('../config/db');

const GrupoPaginaModel = {
    async findAll({ limit, offset }) {
        const { rows } = await db.query(
            `SELECT gp.id, g.nome AS grupo, p.descricao AS pagina, p.link_pagina, gp.ativo
            FROM grupos_paginas gp
            INNER JOIN grupos g ON g.id = gp.grupo_id
            INNER JOIN paginas p ON p.id = gp.pagina_id
            ORDER BY gp.id
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        return rows;
    },

    async countAll() {
        const { rows } = await db.query('SELECT COUNT(*) AS total FROM grupos_paginas');
        return parseInt(rows[0].total, 10);
    },

    async findById(id) {
        const { rows } = await db.query(
            `SELECT gp.id, g.nome AS grupo, p.descricao AS pagina, p.link_pagina, gp.ativo
            FROM grupos_paginas gp
            INNER JOIN grupos g ON g.id = gp.grupo_id
            INNER JOIN paginas p ON p.id = gp.pagina_id
            WHERE gp.id = $1`,
            [id]
        );
        return rows[0];
    },

    async create({ grupo_id, pagina_id }) {
        const { rows } = await db.query(
            `INSERT INTO grupos_paginas (grupo_id, pagina_id, ativo)
            VALUES ($1, $2, true) RETURNING *`,
            [grupo_id, pagina_id]
        );
        return rows[0];
    },

    async update(id, { grupo_id, pagina_id, ativo }) {
        const { rows } = await db.query(
            `UPDATE grupos_paginas
            SET grupo_id = $1, pagina_id = $2, ativo = $3
            WHERE id = $4 RETURNING *`,
            [grupo_id, pagina_id, ativo, id]
        );
        return rows[0];
    },

    async softDelete(id) {
        const { rows } = await db.query(
            `UPDATE grupos_paginas SET ativo = false WHERE id = $1 RETURNING *`,
            [id]
        );
        return rows[0];
    }
};

module.exports = GrupoPaginaModel;
