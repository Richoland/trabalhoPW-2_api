const { getSeriesDB, addSerieDB, updateSerieDB, deleteSerieDB, getSeriePorCodigoDB } = require('../useCases/serieUseCases')

const getSeries = async (request, response) => {
    await getSeriesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar a série: ' + err
        }));
}

const addSerie = async (request, response) => {
    await addSerieDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Série criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateSerie = async (request, response) => {
    await updateSerieDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Série alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteSerie = async (request, response) => {
    await deleteSerieDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getSeriePorCodigo = async (request, response) => {
    await getSeriePorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getSeries, addSerie, updateSerie, deleteSerie, getSeriePorCodigo
}