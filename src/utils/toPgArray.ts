export const toPgArray = (array: string[]) =>
  array.length ? `{${array.join(`,`)}}` : null
