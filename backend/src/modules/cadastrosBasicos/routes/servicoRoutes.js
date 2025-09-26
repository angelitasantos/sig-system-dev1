const express = require('express');
const servicoController = require('../controllers/servicoController');
const servicoValidator = require('../validators/servicoValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, servicoController.listar);
router.get('/:id', authMiddleware, servicoController.buscar);
router.post('/', authMiddleware, servicoValidator, servicoController.criar);
router.put('/:id', authMiddleware, servicoValidator, servicoController.atualizar);
router.patch('/:id/desativar', authMiddleware, servicoController.desativar);

module.exports = router;