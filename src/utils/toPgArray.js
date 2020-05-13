export default (array) => (array.length ? `{${array.join(`,`)}}` : null)
