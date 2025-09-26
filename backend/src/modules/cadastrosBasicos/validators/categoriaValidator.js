const { commonRules, handleValidationErrors } = require('../../../validators/commonRules');
const sanitizers = require('../../../validators/sanitizers');

const categoriaValidator = [
    commonRules.descricao(),
    sanitizers.removeAccents('descricao'),
    handleValidationErrors
];

module.exports = categoriaValidator;
