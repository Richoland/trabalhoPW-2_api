const { pool } = require('../config')
const Review = require('../entities/review')

const getReviewsDB = async () => {
    try {
        const { rows } = await 
        pool.query(`SELECT r.codigo AS codigo, r.nota AS nota, 
        r.descricao AS descricao, 
        r.serie AS serie, s.nome AS nomeserie
        FROM reviews r 
        JOIN series s ON s.codigo = r.serie
        ORDER BY r.codigo`);
        return rows.map((review) => new Review(review.codigo, review.nota,
           review.descricao, review.serie , review.nomeserie));
    } catch(err){
        throw "Erro: " + err;
    }
}

const addReviewDB = async (body) => {
    try {
        const { nota, descricao, serie } = body;
        const results = await pool.query(`INSERT INTO reviews (nota, descricao,
             serie) VALUES ($1, $2, $3) 
            RETURNING codigo, nota, descricao, serie`, 
            [nota, descricao, serie]);
        const review = results.rows[0];
        return new Review(review.codigo, review.nota,
            review.descricao, review.serie , "");
    } catch (err){
        throw "Erro ao inserir a review: " + err;
    }
}

const updateReviewDB = async (body) => {
    try {
        const { codigo, nota, descricao, serie } = body;
        const results = await pool.query(`UPDATE reviews SET nota=$1,
        descricao=$2, serie=$3 WHERE codigo=$4 
        RETURNING codigo, nota, descricao, serie`, 
            [nota, descricao, serie, codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para
            ser alterado`
        }
        const review = results.rows[0];
        return new Review(review.codigo, review.nota,
            review.descricao, review.serie , "");        
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
            return new Review(review.codigo, review.nota,
                review.descricao, review.serie , "");  
        }
    } catch (err){
        throw "Erro ao recuperar a review: " + err;
    }
}

module.exports = { getReviewsDB, addReviewDB, updateReviewDB, 
    deleteReviewDB, getReviewPorCodigoDB }