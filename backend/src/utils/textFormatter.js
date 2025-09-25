const removeAccents = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const removeSpecialChars = (str) => str.replace(/[^a-zA-Z0-9\s]/g, '');

const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '');
    return cnpj.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
    );
};

module.exports = {
    removeAccents,
    removeSpecialChars,
    capitalizeWords,
    formatCPF,
    formatCNPJ,
};
