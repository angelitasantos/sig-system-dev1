const { format } = require('date-fns');

function generateFileName(baseName, extension = 'xlsx') {
    const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
    return `${baseName}_${timestamp}.${extension}`;
}

module.exports = {
    generateFileName,
};
