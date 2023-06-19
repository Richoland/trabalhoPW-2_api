const { getReviewsDB, addReviewDB, updateReviewDB,
  deleteReviewDB, getReviewPorCodigoDB } = require('../useCases/reviewUseCases');

const getReviews = async (request, response) => {
  await getReviewsDB()
    .then(data => response.status(200).json(data))
    .catch(err => {
      response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar as reviews: ' + err
      })
    })
}

const addReview = async (request, response) => {
  await addReviewDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Review criada",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const updateReview = async (request, response) => {
  await updateReviewDB(request.body)
    .then(data => response.status(200).json({
      status: "success", message: "Review alterada",
      objeto: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const deleteReview = async (request, response) => {
  await deleteReviewDB(request.params.codigo)
    .then(data => response.status(200).json({
      status: "success", message: data
    }))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

const getReviewPorCodigo = async (request, response) => {
  await getReviewPorCodigoDB(request.params.codigo)
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status: "error", message: err
    }))
}

module.exports = {
  getReviews, addReview, updateReview,
  deleteReview, getReviewPorCodigo
}