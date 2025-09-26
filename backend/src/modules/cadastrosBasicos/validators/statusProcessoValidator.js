const { commonRules, handleValidationErrors } = require('../../../validators/commonRules');
const sanitizers = require('../../../validators/sanitizers');

const statusProcessoValidator = [
    commonRules.descricao(),
    sanitizers.removeAccents('descricao'),
    handleValidationErrors
];

module.exports = statusProcessoValidator;