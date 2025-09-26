const express = require('express');
const empresaController = require('../controllers/empresaController');
const { commonRules, handleValidationErrors } = require('../validators/commonRules');
const sanitizers = require('../validators/sanitizers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas as rotas protegidas
router.use(authMiddleware);

// Listar
router.get('/', empresaController.list);
router.get('/:id', empresaController.getById);

// Criar
router.post(
    '/',
    [
        commonRules.nome(),
        sanitizers.trimAndUppercase('nome'),
        handleValidationErrors,
    ],
    empresaController.create
);

// Atualizar
router.put(
    '/:id',
    [
        commonRules.nome(),
        sanitizers.trimAndUppercase('nome'),
        handleValidationErrors,
    ],
    empresaController.update
);

// Soft delete
router.patch('/:id/desativar', empresaController.softDelete);

module.exports = router;
