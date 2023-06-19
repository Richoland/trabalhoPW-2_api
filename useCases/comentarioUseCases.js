const { pool } = require('../config')
const Comentario = require('../entities/comentario')

const getComentariosPorReviewDB = async (codigoreview) => {
    try {
        const results = await
            pool.query(`SELECT * FROM comentarios WHERE review = $1 
        ORDER BY codigo`, [codigoreview]);
        if (results.rowCount === 0) {
            throw `Nenhum comentario encontrado com o código de 
            review: ${codigoreview}`;
        } else {
            return results.rows.map((comentario) =>
                new Comentario(comentario.codigo, comentario.descricao,
                    comentario.review));
        }
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addComentarioDB = async (body) => {
    try {
        const { descricao, review } = body;
        const results = await pool.query(`INSERT INTO comentarios (descricao,
             review) VALUES ($1, $2) 
            RETURNING codigo, descricao, review`,
            [descricao, review]);
        const comentario = results.rows[0];
        return new Comentario(comentario.codigo, comentario.descricao,
            comentario.review);
    } catch (err) {
        throw "Erro ao inserir o comentario: " + err;
    }
}

const updateComentarioDB = async (body) => {
    try {
        const { codigo, descricao, review } = body;
        const results = await pool.query(`UPDATE comentarios SET 
        descricao=$1, review=$2 WHERE codigo=$3 
        RETURNING codigo, descricao, review`,
            [descricao, review, codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const comentario = results.rows[0];
        return new Comentario(comentario.codigo, comentario.descricao,
            comentario.review);
    } catch (err) {
        throw "Erro ao alterar o comentario: " + err;
    }
}

const deleteComentarioDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM comentarios 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Comentario de código ${codigo} removido com sucesso!`
        }
    } catch (err) {
        throw "Erro ao remover o comentario: " + err;
    }
}

const getComentarioPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM comentarios 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const comentario = results.rows[0];
            return new Comentario(comentario.codigo, comentario.descricao,
                comentario.review);
        }
    } catch (err) {
        throw "Erro ao recuperar o comentario: " + err;
    }
}

module.exports = {
    getComentariosPorReviewDB, addComentarioDB, updateComentarioDB, 
    deleteComentarioDB, getComentarioPorCodigoDB
}