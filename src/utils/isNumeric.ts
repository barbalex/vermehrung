// the whole string must be numeric ("42", "4.5").
// a prefix check via parseFloat would accept "3 Liter" (-> 3),
// turning it into NaN on the later +value and losing the text
export const isNumeric = (val: unknown) =>
  typeof val === 'number'
    ? !isNaN(val)
    : typeof val === 'string' && val.trim() !== ''
      ? !isNaN(+val)
      : false
