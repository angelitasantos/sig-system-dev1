const { commonRules, handleValidationErrors } = require('../../../validators/commonRules');
const sanitizers = require('../../../validators/sanitizers');

const modalValidator = [
    commonRules.descricao(),
    sanitizers.removeAccents('descricao'),
    handleValidationErrors
];

module.exports = modalValidator;