const { Router } = require('express');

const { getSeries, addSerie, updateSerie,
     deleteSerie, getSeriePorCodigo } = require('../controllers/seriesController')

const { getReviews, addReview, updateReview, deleteReview, getReviewPorCodigo }
     = require('../controllers/reviewController');

const { getEquipamentoPorReview, addEquipamento, updateEquipamento,
     deleteEquipamento, getEquipamentoPorCodigo } =
     require('../controllers/equipamentosController');

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

rotas.route('/equipamentos/review/:codigoreview')
     .get(verificaJWT, getEquipamentoPorReview)

rotas.route('/equipamentos')
     .post(verificaJWT, addEquipamento)
     .put(verificaJWT, updateEquipamento);

rotas.route('/equipamentos/:codigo')
     .get(verificaJWT, getEquipamentoPorCodigo)
     .delete(verificaJWT, deleteEquipamento);     

module.exports = rotas;