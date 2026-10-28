// see: https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric/1830844#1830844

export const isNumeric = (val: unknown) =>
  typeof val === 'number' ? !isNaN(val) : typeof val === 'string' ? !isNaN(parseFloat(val)) : false
