const express = require('express');
const grupoPaginaController = require('../controllers/grupoPaginaController');
const { grupoPaginaRules, handleValidationErrors } = require('../validators/commonRules');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, grupoPaginaController.listar);
router.get('/:id', authMiddleware, grupoPaginaController.buscarPorId);

router.post(
    '/',
    authMiddleware,
    grupoPaginaRules,
    handleValidationErrors,
    grupoPaginaController.criar
);

router.put(
    '/:id',
    authMiddleware,
    grupoPaginaRules,
    handleValidationErrors,
    grupoPaginaController.atualizar
);

router.patch('/:id/soft-delete', authMiddleware, grupoPaginaController.excluir);

module.exports = router;
