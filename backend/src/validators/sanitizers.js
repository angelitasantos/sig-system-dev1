const { body } = require('express-validator');

const sanitizers = {
    trimAndLowercase: (field) =>
        body(field).trim().toLowerCase(),

    trimAndUppercase: (field) =>
        body(field).trim().toUpperCase(),

    onlyNumbers: (field) =>
        body(field).customSanitizer(value => value.replace(/\D/g, '')),

    removeAccents: (field) =>
        body(field).customSanitizer(value =>
        value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        )
};

module.exports = sanitizers;
