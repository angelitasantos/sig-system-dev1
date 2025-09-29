const express = require('express');
const processoController = require('../controllers/processoController');
const processoValidator = require('../validators/processoValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

// Todas as rotas protegidas
router.use(authMiddleware);

router.get('/', processoController.listar);
router.get('/:id', processoController.buscar);
router.post('/', processoValidator, processoController.criar);
router.put('/:id', processoValidator, processoController.atualizar);
router.patch('/:id/desativar', processoController.desativar);

module.exports = router;
