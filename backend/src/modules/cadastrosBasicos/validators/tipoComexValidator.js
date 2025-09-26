const { commonRules, handleValidationErrors } = require('../../../validators/commonRules');
const sanitizers = require('../../../validators/sanitizers');

const tipoComexValidator = [
    commonRules.descricao(),
    sanitizers.removeAccents('descricao'),
    handleValidationErrors
];

module.exports = tipoComexValidator;