const { Router } = require('express');

const { getSeries, addSerie, updateSerie,
     deleteSerie, getSeriePorCodigo } = require('../controllers/seriesController')

const { getReviews, addReview, updateReview, deleteReview, getReviewPorCodigo }
     = require('../controllers/reviewController');

const { getComentarioPorReview, addComentario, updateComentario,
     deleteComentario, getComentarioPorCodigo } =
     require('../controllers/comentariosController');

const { login , verificaJWT } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route('/login')
     .post(login);
     
rotas.route('/series')
     .get(verificaJWT, getSeries)
     .post(verificaJWT, addSerie)
     .put(verificaJWT, updateSerie);

rotas.route('/series/:codigo')
     .get(verificaJWT, getSeriePorCodigo)
     .delete(verificaJWT, deleteSerie);

rotas.route('/reviews')
     .get(verificaJWT, getReviews)
     .post(verificaJWT, addReview)
     .put(verificaJWT, updateReview);

rotas.route('/reviews/:codigo')
     .get(verificaJWT, getReviewPorCodigo)
     .delete(verificaJWT, deleteReview);

rotas.route('/comentarios/review/:codigoreview')
     .get(verificaJWT, getComentarioPorReview)
 
rotas.route('/comentarios')
     .post(verificaJWT, addComentario)
     .put(verificaJWT, updateComentario);

rotas.route('/comentarios/:codigo')
     .get(verificaJWT, getComentarioPorCodigo)
     .delete(verificaJWT, deleteComentario);     

module.exports = rotas;