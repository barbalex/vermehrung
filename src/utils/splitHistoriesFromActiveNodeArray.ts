// splits an activeNodeArray from the url into:
// - the activeNodeArray without the histories suffix
// - the rev of the revision to show, if the url contains one
// 'histories' can not be part of a regular url:
// it is no table name and ids are uuids
export const splitHistoriesFromActiveNodeArray = (url: string[]) => {
  const indexOfHistories = url.indexOf('histories')
  if (indexOfHistories === -1) {
    return { activeNodeArray: url, historyRev: undefined }
  }
  return {
    activeNodeArray: url.slice(0, indexOfHistories),
    // true when the url ends with 'histories':
    // history is open but the rev is not yet known
    historyRev: url[indexOfHistories + 1] ?? true,
  }
}
