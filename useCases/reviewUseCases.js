const { pool } = require('../config')
const Review = require('../entities/review')

const getReviewsDB = async () => {
    try {
        const { rows } = await 
        pool.query(`SELECT r.codigo AS codigo, r.numero AS numero, 
        r.descricao AS descricao, r.capacidade AS capacidade, 
        r.predio AS predio, p.nome AS nomepredio
        FROM reviews r 
        JOIN predios p ON p.codigo = r.predio
        ORDER BY r.codigo`);
        return rows.map((review) => new Review(review.codigo, review.numero,
           review.descricao, review.capacidade, review.predio , review.nomepredio));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addReviewDB = async (body) => {
    try {
        const { numero, descricao, capacidade, predio } = body;
        const results = await pool.query(`INSERT INTO reviews (numero, descricao,
            capacidade, predio) VALUES ($1, $2, $3, $4) 
            RETURNING codigo, numero, descricao, capacidade, predio`, 
            [numero, descricao, capacidade, predio]);
        const review = results.rows[0];
        return new Review(review.codigo, review.numero,
            review.descricao, review.capacidade, review.predio , "");
    } catch (err){
        throw "Erro ao inserir a review: " + err;
    }
}

const updateReviewDB = async (body) => {
    try {
        const { codigo, numero, descricao, capacidade, predio } = body;
        const results = await pool.query(`UPDATE reviews SET numero=$1,
        descricao=$2, capacidade = $3, predio = $4 WHERE codigo=$5 
        RETURNING codigo, numero, descricao, capacidade, predio`, 
            [numero, descricao, capacidade, predio, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const review = results.rows[0];
        return new Review(review.codigo, review.numero,
            review.descricao, review.capacidade, review.predio , "");        
    } catch (err){
        throw "Erro ao alterar review: " + err;
    }
}

const deleteReviewDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM reviews 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`
        } else {
            return `Review de código ${codigo} removida com sucesso!`
        }
    } catch (err){
        throw "Erro ao remover a review: " + err;
    }
}

const getReviewPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM reviews 
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const review = results.rows[0];
            return new Review(review.codigo, review.numero,
                review.descricao, review.capacidade, review.predio , "");  
        }
    } catch (err){
        throw "Erro ao recuperar a review: " + err;
    }
}

module.exports = { getReviewsDB, addReviewDB, updateReviewDB, 
    deleteReviewDB, getReviewPorCodigoDB }