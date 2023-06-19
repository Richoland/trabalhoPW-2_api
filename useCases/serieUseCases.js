const { pool } = require('../config');
const Serie = require('../entities/serie')

const getSeriesDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM series order by codigo');
        return rows.map((serie) => new Serie(serie.codigo, serie.nome, serie.descricao, serie.episodio, serie.temporada));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addSerieDB = async (body) => {
    try {   
        const { nome, descricao, episodio, temporada } = body; 
        const results = await pool.query(`INSERT INTO series (nome, descricao, episodio, temporada) 
        values ($1, $2, $3, $4) returning codigo, nome, descricao, episodio, temporada`,
        [nome, descricao, episodio, temporada]);
        const serie = results.rows[0];
        return new Serie(serie.codigo, serie.nome, serie.descricao, serie.episodio, serie.temporada);
    } catch (err) {
        throw "Erro ao inserir a serie: " + err;
    }    
}


const updateSerieDB = async (body) => {
    try {   
        const { codigo, nome, descricao, episodio, temporada }  = body; 
        const results = await pool.query(`UPDATE series SET nome=$1, descricao=$2, episodio=$3, temporada=$4
        where codigo=$5 returning codigo, nome, descricao, episodio, temporada`,
        [nome, descricao, episodio, temporada, codigo]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const serie = results.rows[0];
        return new Serie(serie.codigo, serie.nome, serie.descricao, serie.episodio, serie.temporada);
    } catch (err) {
        throw "Erro ao alterar a série: " + err;
    }      
}

const deleteSerieDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM series WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Série removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a série: " + err;
    }     
}

const getSeriePorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM series WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const serie = results.rows[0];
            return new Serie(serie.codigo, serie.nome, serie.descricao, serie.episodio, serie.temporada);            
        }       
    } catch (err) {
        throw "Erro ao recuperar o prédio: " + err;
    }     
}


module.exports = {
    getSeriesDB, addSerieDB, updateSerieDB, deleteSerieDB, getSeriePorCodigoDB
}