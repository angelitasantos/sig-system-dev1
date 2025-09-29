const express = require('express');
const parceiroEmpresaController = require('../controllers/parceiroEmpresaController');
const parceiroEmpresaValidator = require('../validators/parceiroEmpresaValidator');
const authMiddleware = require('../../../middlewares/authMiddleware');

const router = express.Router();

// Todas as rotas protegidas
router.use(authMiddleware);

router.get('/', parceiroEmpresaController.listar);
router.get('/:parceiro_id/:empresa_id', parceiroEmpresaController.buscar);
router.post('/', parceiroEmpresaValidator, parceiroEmpresaController.criar);
router.put('/:parceiro_id/:empresa_id', parceiroEmpresaValidator, parceiroEmpresaController.atualizar);
router.delete('/:parceiro_id/:empresa_id', parceiroEmpresaController.deletar);

module.exports = router;
