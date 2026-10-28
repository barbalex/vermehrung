export const toPgArray = (array) =>
  array.length ? `{${array.join(`,`)}}` : null
