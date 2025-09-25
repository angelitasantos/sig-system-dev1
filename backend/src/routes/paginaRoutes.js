const express = require('express');
const paginaController = require('../controllers/paginaController');
const { commonRules, handleValidationErrors } = require('../validators/commonRules');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas
router.get('/', authMiddleware, paginaController.listar);
router.get('/:id', authMiddleware, paginaController.buscarPorId);

router.post(
    '/',
    authMiddleware,
    commonRules.descricao(),
    commonRules.linkPaginaRule(),
    handleValidationErrors,
    paginaController.criar
);

router.put(
    '/:id',
    authMiddleware,
    commonRules.descricao(),
    commonRules.linkPaginaRule(),
    handleValidationErrors,
    paginaController.atualizar
);

router.patch('/:id/soft-delete', authMiddleware, paginaController.excluir);

module.exports = router;
