const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const categoriaValidator = require('../validators/categoriaValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, categoriaController.listar);
router.get('/:id', authMiddleware, categoriaController.buscar);
router.post('/', authMiddleware, categoriaValidator, categoriaController.criar);
router.put('/:id', authMiddleware, categoriaValidator, categoriaController.atualizar);
router.patch('/:id/desativar', authMiddleware, categoriaController.desativar);

module.exports = router;
