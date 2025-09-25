const { format, parseISO } = require('date-fns');

// Formata para DD/MM/YYYY
function formatDate(date) {
    return format(new Date(date), 'dd/MM/yyyy');
}

// Formata para YYYY-MM-DD (SQL)
function formatDateSQL(date) {
    return format(new Date(date), 'yyyy-MM-dd');
}

// Formata data e hora
function formatDateTime(date) {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
}

// Converte string ISO para objeto Date
function parseDate(dateString) {
  return parseISO(dateString);
}

module.exports = {
    formatDate,
    formatDateSQL,
    formatDateTime,
    parseDate,
};
