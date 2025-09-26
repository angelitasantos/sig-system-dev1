const express = require('express');
const statusProcessoController = require('../controllers/statusProcessoController');
const statusProcessoValidator = require('../validators/statusProcessoValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, statusProcessoController.listar);
router.get('/:id', authMiddleware, statusProcessoController.buscar);
router.post('/', authMiddleware, statusProcessoValidator, statusProcessoController.criar);
router.put('/:id', authMiddleware, statusProcessoValidator, statusProcessoController.atualizar);
router.patch('/:id/desativar', authMiddleware, statusProcessoController.desativar);

module.exports = router;