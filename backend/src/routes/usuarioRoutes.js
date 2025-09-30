const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { commonRules, handleValidationErrors } = require('../validators/commonRules');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Abertos
router.post('/login', [commonRules.email(), commonRules.senha()], handleValidationErrors, usuarioController.login);
router.post(
    '/registrar',
    [commonRules.nome(), commonRules.email()],
    handleValidationErrors,
    usuarioController.registrar
);

// Protegidos
router.get('/', authMiddleware, usuarioController.listar);
router.get('/:id', authMiddleware, usuarioController.buscarPorId);
router.get('/:id/permissoes', authMiddleware, usuarioController.getPermissoes);

router.put('/:id', authMiddleware, [commonRules.nome(), commonRules.email()], handleValidationErrors, usuarioController.atualizar);

router.patch('/:id/soft-delete', authMiddleware, usuarioController.excluir);

// Perfil próprio
router.get('/me/permissoes', authMiddleware, usuarioController.getMinhasPermissoes);
router.put('/me', authMiddleware, [commonRules.nome(), commonRules.email()], handleValidationErrors, usuarioController.editarPerfil);
router.put('/me/trocar-senha', usuarioController.trocarSenha);
router.post('/me/logout', authMiddleware, usuarioController.logout);

module.exports = router;
