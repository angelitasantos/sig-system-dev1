const express = require('express');
const modalController = require('../controllers/modalController');
const modalValidator = require('../validators/modalValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, modalController.listar);
router.get('/:id', authMiddleware, modalController.buscar);
router.post('/', authMiddleware, modalValidator, modalController.criar);
router.put('/:id', authMiddleware, modalValidator, modalController.atualizar);
router.patch('/:id/desativar', authMiddleware, modalController.desativar);

module.exports = router;