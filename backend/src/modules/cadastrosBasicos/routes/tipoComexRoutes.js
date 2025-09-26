const express = require('express');
const tipoComexController = require('../controllers/tipoComexController');
const tipoComexValidator = require('../validators/tipoComexValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, tipoComexController.listar);
router.get('/:id', authMiddleware, tipoComexController.buscar);
router.post('/', authMiddleware, tipoComexValidator, tipoComexController.criar);
router.put('/:id', authMiddleware, tipoComexValidator, tipoComexController.atualizar);
router.patch('/:id/desativar', authMiddleware, tipoComexController.desativar);

module.exports = router;