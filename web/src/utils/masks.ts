export const formatCPF = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    const paddedValue = numericValue.substring(0, 11);

    return paddedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const formatPhone = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    const paddedValue = numericValue.substring(0, 11);

    if (paddedValue.length <= 10) {
        return paddedValue
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }

    return paddedValue
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
};

export const formatPlate = (value: string): string => {
    let cleanedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    cleanedValue = cleanedValue.substring(0, 7);

    if (cleanedValue.length > 3) {
        cleanedValue =
            cleanedValue.substring(0, 3) + '-' + cleanedValue.substring(3);
    }

    return cleanedValue;
};
