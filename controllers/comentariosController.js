const { getComentariosPorReviewDB, addComentarioDB, updateComentarioDB,
  deleteComentarioDB, getComentarioPorCodigoDB } = require('../useCases/comentarioUseCases');

const getComentarioPorReview = async (request, response) => {
  await getComentariosPorReviewDB(request.params.codigoreview)
    .then(data => response.status(200).json(data))
    .catch(err => {
      response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar os comentarios da review: ' + err
      })
    })
}

const addComentario = async (request, response) => {
  await addComentarioDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Comentario criado",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const updateComentario = async (request, response) => {
  await updateComentarioDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Comentario alterado",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const deleteComentario = async (request, response) => {
  await deleteComentarioDB(request.params.codigo)
    .then(data => response.status(200).json({
      status: "success", message: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const getComentarioPorCodigo = async (request, response) => {
  await getComentarioPorCodigoDB(request.params.codigo)
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

module.exports = {
  getComentarioPorReview, addComentario, updateComentario, 
  deleteComentario, getComentarioPorCodigo
}