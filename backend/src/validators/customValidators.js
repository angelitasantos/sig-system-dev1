const customValidators = {
    isStrongPassword: (value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(value)) {
            throw new Error('Senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial!');
        }
        return true;
    },

    isValidCPF: (value) => {
        if (!/^\d{11}$/.test(value)) throw new Error('CPF deve ter 11 dígitos numéricos!');
        return true;
    },

    isValidDate: (value) => {
        if (isNaN(Date.parse(value))) {
            throw new Error('Data inválida!');
        }
        return true;
    }
};

module.exports = customValidators;
