const db = require('../../../config/db');

const ParceiroModel = {
    async getAll({ page = 1, limit = 100, sort = 'nome', order = 'asc', search = '' }) {
        const offset = (page - 1) * limit;

        // Segurança no ORDER BY (evitar SQL injection)
        const validSortColumns = ['nome', 'cnpj_cpf'];
        const sortBy = validSortColumns.includes(sort) ? sort : 'nome';
        const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

        // Filtro
        const whereClause = search
            ? `WHERE p.nome ILIKE $1 OR p.cnpj_cpf ILIKE $1 OR pe.sigla_import ILIKE $1 OR pe.sigla_export ILIKE $1`
            : '';

        const values = search ? [`%${search}%`, limit, offset] : [limit, offset];

        const query = `
            SELECT p.*, c.descricao AS categoria_nome,
                    COALESCE(STRING_AGG(DISTINCT pe.sigla_import, ', '), '') AS siglas_import,
                    COALESCE(STRING_AGG(DISTINCT pe.sigla_export, ', '), '') AS siglas_export
            FROM parceiros p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            LEFT JOIN parceiros_empresas pe ON p.id = pe.parceiro_id
            ${whereClause}
            GROUP BY p.id, c.descricao
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT $${search ? 2 : 1} OFFSET $${search ? 3 : 2}
        `;

        const { rows } = await db.query(query, values);

        // Contagem total para paginação
        const countQuery = `
        SELECT COUNT(DISTINCT p.id) AS total
            FROM parceiros p
            LEFT JOIN parceiros_empresas pe ON p.id = pe.parceiro_id
            ${whereClause}
        `;
        const countRes = await db.query(countQuery, search ? [`%${search}%`] : []);
        const total = parseInt(countRes.rows[0].total, 10);

        return {
            data: rows,
            pagination: {
                total,
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                totalPages: Math.ceil(total / limit),
            },
        };
    },

    async getById(id) {
        const { rows } = await db.query(
            `SELECT p.*, c.descricao AS categoria_nome
            FROM parceiros p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            WHERE p.id = $1`,
            [id]
        );
        return rows[0];
    },

    async create({ nome, cnpj_cpf, insc_est, nome_completo, categoria_id }) {
        const { rows } = await db.query(
            `INSERT INTO parceiros (nome, cnpj_cpf, insc_est, nome_completo, categoria_id, ativo)
            VALUES ($1, $2, $3, $4, $5, TRUE)
            RETURNING *`,
            [nome, cnpj_cpf, insc_est, nome_completo, categoria_id]
        );
        return rows[0];
    },

    async update(id, { nome, cnpj_cpf, insc_est, nome_completo, categoria_id }) {
        const { rows } = await db.query(
            `UPDATE parceiros
            SET nome = $1,
                cnpj_cpf = $2,
                insc_est = $3,
                nome_completo = $4,
                categoria_id = $5
            WHERE id = $6
            RETURNING *`,
            [nome, cnpj_cpf, insc_est, nome_completo, categoria_id, id]
        );
        return rows[0];
    },

    async softDelete(id) {
        const { rows } = await db.query(
            `UPDATE parceiros
            SET ativo = FALSE
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return rows[0];
    }
};

module.exports = ParceiroModel;
