const toPgArray = (array) => (array.length ? `{${array.join(`,`)}}` : null)

export default toPgArray
