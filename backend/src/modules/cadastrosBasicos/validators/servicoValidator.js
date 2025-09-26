const { commonRules, handleValidationErrors } = require('../../../validators/commonRules');
const sanitizers = require('../../../validators/sanitizers');

const servicoValidator = [
    commonRules.descricao(),
    sanitizers.removeAccents('descricao'),
    handleValidationErrors
];

module.exports = servicoValidator;