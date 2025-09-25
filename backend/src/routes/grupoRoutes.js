const express = require('express');
const grupoController = require('../controllers/grupoController');
const { commonRules, handleValidationErrors } = require('../validators/commonRules');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas as rotas de grupo exigem login (authMiddleware)
router.get('/', authMiddleware, grupoController.listar);
router.get('/:id', authMiddleware, grupoController.buscarPorId);

router.post(
    '/',
    authMiddleware,
    commonRules.descricao(),
    handleValidationErrors,
    grupoController.criar
);

router.put(
    '/:id',
    authMiddleware,
    commonRules.descricao(),
    handleValidationErrors,
    grupoController.atualizar
);

router.patch('/:id/soft-delete', authMiddleware, grupoController.excluir);

module.exports = router;
