const express = require('express');
const tipoServicoController = require('../controllers/tipoServicoController');
const tipoServicoValidator = require('../validators/tipoServicoValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, tipoServicoController.listar);
router.get('/:id', authMiddleware, tipoServicoController.buscar);
router.post('/', authMiddleware, tipoServicoValidator, tipoServicoController.criar);
router.put('/:id', authMiddleware, tipoServicoValidator, tipoServicoController.atualizar);
router.patch('/:id/desativar', authMiddleware, tipoServicoController.desativar);

module.exports = router;