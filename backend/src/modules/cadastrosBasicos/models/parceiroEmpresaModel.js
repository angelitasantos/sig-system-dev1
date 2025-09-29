const db = require('../../../config/db');

const ParceiroEmpresaModel = {
    async getAll() {
        const { rows } = await db.query(`
            SELECT pe.*, p.nome AS parceiro_nome, e.nome AS empresa_nome
            FROM parceiros_empresas pe
            JOIN parceiros p ON pe.parceiro_id = p.id
            JOIN empresas e ON pe.empresa_id = e.id
            ORDER BY pe.parceiro_id, pe.empresa_id
        `);
        return rows;
    },

    async getById(parceiro_id, empresa_id) {
        const { rows } = await db.query(
            `SELECT * FROM parceiros_empresas
            WHERE parceiro_id = $1 AND empresa_id = $2`,
            [parceiro_id, empresa_id]
        );
        return rows[0];
    },

    async create({ parceiro_id, empresa_id, sigla_import, sigla_export }) {
        const { rows } = await db.query(
            `INSERT INTO parceiros_empresas (parceiro_id, empresa_id, sigla_import, sigla_export)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [parceiro_id, empresa_id, sigla_import, sigla_export]
        );
        return rows[0];
    },

    async update(parceiro_id, empresa_id, { sigla_import, sigla_export }) {
        const { rows } = await db.query(
            `UPDATE parceiros_empresas
            SET sigla_import = $1,
                sigla_export = $2
            WHERE parceiro_id = $3 AND empresa_id = $4
            RETURNING *`,
            [sigla_import, sigla_export, parceiro_id, empresa_id]
        );
        return rows[0];
    },

    async delete(parceiro_id, empresa_id) {
        const { rows } = await db.query(
            `DELETE FROM parceiros_empresas
            WHERE parceiro_id = $1 AND empresa_id = $2
            RETURNING *`,
            [parceiro_id, empresa_id]
        );
        return rows[0];
    },
};

module.exports = ParceiroEmpresaModel;
