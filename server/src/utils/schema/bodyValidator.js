const isValidArray = ({ value = '', min = 1, max = 5, minMessage = '', key = '', maxMessage = '' } = {}) => {
  if (!Array.isArray(value)) return `${key} is not a valid array.`;
  if (value.length < min) return minMessage || `${key} must contain at least ${min} items.`;
  if (value.length > max) return maxMessage || `${key} must not contain more than ${max} items.`;
};

const isValidString = ({ value = '', min = 1, max = 5, minMessage = '', key = '', maxMessage = '' } = {}) => {
  if (typeof value !== 'string') return `${key} is not a valid string.`;
  if (value.length < min) return minMessage || `${key} must contain at least ${min} characters.`;
  if (value.length > max) return maxMessage || `${key} must not exceed ${max} characters.`;
};

const isValidNumber = ({ value = '', min = 1, max = 5, minMessage = '', key = '', maxMessage = '' } = {}) => {
  if (typeof value !== 'number') return `${key} is not a valid number.`;
  if (value < min) return minMessage || `${key} must not go lower than ${min}.`;
  if (value > max) return maxMessage || `${key} must not go higher than ${max}.`;
};

exports.bodyValidator = (fields = {}, options = {}) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!options[key]) continue;

    const type = options[key]?.type || 'string';
    const min = options[key]?.min?.[0] ?? 0;
    const max = options[key]?.max?.[0] ?? 10000;

    const payload = {
      value,
      max,
      min,
      key,
      minMessage: options[key]?.min?.[1],
      maxMessage: options[key]?.max?.[1]
    };

    let errorMessage;
    if (type === 'array') errorMessage = isValidArray(payload);
    if (type === 'string') errorMessage = isValidString(payload);
    if (type === 'number') errorMessage = isValidNumber(payload);

    if (errorMessage) {
      return { error: errorMessage };
    }
  }

  return fields;
};