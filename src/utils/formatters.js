export const formatCurrency = (value, currency = 'EUR', locale = 'es-ES') => {
  if (typeof value !== 'number' || isNaN(value)) {
    return ''; // Or some default like 'N/A' or 0.00
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value, locale = 'es-ES') => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '';
  }
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};