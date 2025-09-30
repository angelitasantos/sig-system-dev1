const db = require('../config/db');

const UsuarioModel = {
    async findAll({ limit, offset }) {
        const { rows } = await db.query(
            `SELECT u.id, u.nome, u.email, u.ativo, u.criado_em, g.descricao AS grupo
            FROM usuarios u
            LEFT JOIN grupos g ON g.id = u.grupo_id
            ORDER BY u.id
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        return rows;
    },

    async countAll() {
        const { rows } = await db.query('SELECT COUNT(*) AS total FROM usuarios');
        return parseInt(rows[0].total, 10);
    },

    async findById(id) {
        const { rows } = await db.query(
            `SELECT u.id, u.nome, u.email, u.ativo, u.criado_em, g.descricao AS grupo
            FROM usuarios u
            LEFT JOIN grupos g ON g.id = u.grupo_id
            WHERE u.id = $1`,
            [id]
        );
        return rows[0];
    },

    async findByEmail(email) {
        const { rows } = await db.query(
            `SELECT * FROM usuarios WHERE email = $1 LIMIT 1`,
            [email]
        );
        return rows[0];
    },

    async create({ nome, email, senha_hash, grupo_id }) {
        const { rows } = await db.query(
            `INSERT INTO usuarios (nome, email, senha_hash, grupo_id, ativo)
            VALUES ($1, $2, $3, $4, true)
            RETURNING id, nome, email, grupo_id, ativo, criado_em`,
            [nome, email, senha_hash, grupo_id]
        );
        return rows[0];
    },

    async update(id, { nome, email, grupo_id, ativo }) {
        const { rows } = await db.query(
            `UPDATE usuarios
            SET nome = $1, email = $2, grupo_id = $3, ativo = $4
            WHERE id = $5 RETURNING id, nome, email, grupo_id, ativo, criado_em`,
            [nome, email, grupo_id, ativo, id]
        );
        return rows[0];
    },

    async updateSenha(id, senha_hash) {
        const { rows } = await db.query(
            `UPDATE usuarios SET senha_hash = $1 WHERE id = $2 RETURNING id, email`,
            [senha_hash, id]
        );
        return rows[0];
    },

    async softDelete(id) {
        const { rows } = await db.query(
            `UPDATE usuarios SET ativo = false WHERE id = $1 RETURNING id, nome, email, ativo`,
            [id]
        );
        return rows[0];
    },

    async findPermissoesByUsuarioId(usuarioId) {
        const { rows } = await db.query(
            `SELECT p.id, p.descricao, p.link_pagina
            FROM usuarios u
            INNER JOIN grupos g ON g.id = u.grupo_id
            INNER JOIN grupos_paginas gp ON gp.grupo_id = g.id
            INNER JOIN paginas p ON p.id = gp.pagina_id
            WHERE u.id = $1
            AND u.ativo = TRUE
            AND g.ativo = TRUE
            AND gp.acesso = TRUE
            AND p.ativo = TRUE
            ORDER BY p.descricao ASC`,
            [usuarioId]
        );
        return rows;
    },

    async findGrupoByUsuarioId(usuarioId) {
        const { rows } = await db.query(
            `SELECT g.id, g.descricao
            FROM usuarios u
            LEFT JOIN grupos g ON g.id = u.grupo_id
            WHERE u.id = $1`,
            [usuarioId]
        );
        return rows[0];
    }
};

module.exports = UsuarioModel;
