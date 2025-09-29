const db = require('../../../config/db');

const ProcessoModel = {
    async getAllPaginated(filtros = {}, limit = 100, offset = 0) {
        let query = `
            SELECT 
                p.*,
                e.nome AS empresa_nome,
                pa.nome AS parceiro_nome,
                u.nome AS usuario_nome,
                ts.descricao AS tipo_servico_desc,
                s.descricao AS servico_desc,
                tc.descricao AS tipo_comex_desc,
                sp.descricao AS status_desc,
                m.descricao AS modal_desc
            FROM processos p
            LEFT JOIN empresas e ON p.empresa_id = e.id
            LEFT JOIN parceiros pa ON p.parceiro_id = pa.id
            LEFT JOIN usuarios u ON p.usuario_id = u.id
            LEFT JOIN tipos_servico ts ON p.tipo_servico_id = ts.id
            LEFT JOIN servicos s ON p.servico_id = s.id
            LEFT JOIN tipos_comex tc ON p.tipo_comex_id = tc.id
            LEFT JOIN status_processo sp ON p.status_processo_id = sp.id
            LEFT JOIN modais m ON p.modais_id = m.id
            WHERE 1=1
        `;

        const values = [];
        let idx = 1;

        if (filtros.empresa_id) {
            query += ` AND p.empresa_id = $${idx++}`;
            values.push(filtros.empresa_id);
        }
        if (filtros.parceiro_id) {
            query += ` AND p.parceiro_id = $${idx++}`;
            values.push(filtros.parceiro_id);
        }
        if (filtros.usuario_id) {
            query += ` AND p.usuario_id = $${idx++}`;
            values.push(filtros.usuario_id);
        }
        if (filtros.tipo_servico_id) {
            query += ` AND p.tipo_servico_id = $${idx++}`;
            values.push(filtros.tipo_servico_id);
        }
        if (filtros.servico_id) {
            query += ` AND p.servico_id = $${idx++}`;
            values.push(filtros.servico_id);
        }
        if (filtros.tipo_comex_id) {
            query += ` AND p.tipo_comex_id = $${idx++}`;
            values.push(filtros.tipo_comex_id);
        }
        if (filtros.status_processo_id) {
            query += ` AND p.status_processo_id = $${idx++}`;
            values.push(filtros.status_processo_id);
        }
        if (filtros.modais_id) {
            query += ` AND p.modais_id = $${idx++}`;
            values.push(filtros.modais_id);
        }
        if (filtros.ano) {
            query += ` AND p.ano = $${idx++}`;
            values.push(filtros.ano);
        }
        if (filtros.mes) {
            query += ` AND p.mes = $${idx++}`;
            values.push(filtros.mes);
        }
        if (filtros.busca) {
            query += ` AND (p.numero_processo ILIKE $${idx} OR p.ref_parceiro ILIKE $${idx})`;
            values.push(`%${filtros.busca}%`);
            idx++;
        }

        query += ` ORDER BY p.data_criacao DESC LIMIT $${idx++} OFFSET $${idx++}`;
        values.push(limit, offset);

        const { rows } = await db.query(query, values);
        return rows;
    },

    async getById(id) {
        const { rows } = await db.query(
            `SELECT * FROM processos WHERE id = $1`,
            [id]
        );
        return rows[0];
    },

    async getByRefParceiro(ref_parceiro) {
        const { rows } = await db.query(
            `SELECT * FROM processos WHERE ref_parceiro = $1`,
            [ref_parceiro]
        );
        return rows;
    },

    async create(data) {
        const { rows } = await db.query(
            `INSERT INTO processos 
            (numero_processo, tipo_operacao, empresa_id, parceiro_id, usuario_id, tipo_servico_id, servico_id, tipo_comex_id, status_processo_id, modais_id, ref_parceiro, ano, mes)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
            RETURNING *`,
            [
                data.numero_processo,
                data.tipo_operacao,
                data.empresa_id,
                data.parceiro_id,
                data.usuario_id,
                data.tipo_servico_id,
                data.servico_id,
                data.tipo_comex_id,
                data.status_processo_id,
                data.modais_id,
                data.ref_parceiro,
                data.ano || new Date().getFullYear(),
                data.mes || new Date().getMonth() + 1
            ]
        );
        return rows[0];
    },

    async update(id, data) {
        const { rows } = await db.query(
            `UPDATE processos SET
                tipo_operacao=$1,
                empresa_id=$2,
                parceiro_id=$3,
                usuario_id=$4,
                tipo_servico_id=$5,
                servico_id=$6,
                tipo_comex_id=$7,
                status_processo_id=$8,
                modais_id=$9,
                ref_parceiro=$10,
                data_atualizacao=NOW()
            WHERE id=$11 RETURNING *`,
            [
                data.tipo_operacao,
                data.empresa_id,
                data.parceiro_id,
                data.usuario_id,
                data.tipo_servico_id,
                data.servico_id,
                data.tipo_comex_id,
                data.status_processo_id,
                data.modais_id,
                data.ref_parceiro,
                id
            ]
        );
        return rows[0];
    },

    async desativar(id) {
        const { rows } = await db.query(
            `UPDATE processos SET ativo = FALSE, data_atualizacao = NOW()
            WHERE id = $1 RETURNING *`,
            [id]
        );
        return rows[0];
    }

};

module.exports = ProcessoModel;
