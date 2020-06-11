export default (v) =>
  v._deleted === false ||
  (v._deleted === true && v?._conflicts?.length && v._conflicts.length > 0)
