export default (strings, ...values) => (
  strings.reduce((acc, str, index) => `${acc}${str}${(values[index] || '')}`, '')
);
