// Formata valores monetários (ex: BRL, USD, EUR)
function formatCurrencyBR(value, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(value);
}

function parseCurrency(value) {
    // Remove caracteres não numéricos e converte para float
    return parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.'));
}

module.exports = {
    formatCurrencyBR,
    parseCurrency,
};
