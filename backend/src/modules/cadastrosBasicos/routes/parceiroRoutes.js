const express = require('express');
const parceiroController = require('../controllers/parceiroController');
const parceiroValidator = require('../validators/parceiroValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

// Todas as rotas protegidas
router.use(authMiddleware);

router.get('/', parceiroController.listar);
router.get('/:id', parceiroController.buscarPorId);
router.post('/', parceiroValidator, parceiroController.criar);
router.put('/:id', parceiroValidator, parceiroController.atualizar);
router.delete('/:id', parceiroController.deletar);

module.exports = router;
