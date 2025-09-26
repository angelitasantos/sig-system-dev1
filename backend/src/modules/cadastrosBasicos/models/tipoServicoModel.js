const db = require('../../../config/db');

const tipoServicoModel = {
    findAll: async () => {
        const result = await db.query(
            'SELECT * FROM tipos_servico WHERE ativo = true ORDER BY id ASC'
        );
        return result.rows;
    },

    findById: async (id) => {
        const result = await db.query(
            'SELECT * FROM tipos_servico WHERE id = $1 AND ativo = true',
            [id]
        );
        return result.rows[0];
    },

    create: async (descricao) => {
        const result = await db.query(
            'INSERT INTO tipos_servico (descricao) VALUES ($1) RETURNING *',
            [descricao]
        );
        return result.rows[0];
    },

    update: async (id, descricao) => {
        const result = await db.query(
            'UPDATE tipos_servico SET descricao = $1 WHERE id = $2 AND ativo = true RETURNING *',
            [descricao, id]
        );
        return result.rows[0];
    },

    softDelete: async (id) => {
        const result = await db.query(
            'UPDATE tipos_servico SET ativo = false WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    },
};

module.exports = tipoServicoModel;
