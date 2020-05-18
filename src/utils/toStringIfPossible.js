/**
 * This is necessary because:
 * - null and undefined have no toString function
 */
export default (val) => (val.toString ? val.toString() : val)
