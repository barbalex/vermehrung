import { isId } from './isId.ts'
import { singularOfFolder } from './singularOfFolder.ts'

// splits an activeNodeArray from the url into:
// - the activeNodeArray without the object name suffix
// - the object name, if the url ends with one
// the suffix only applies when the segment before it is an id and the
// folder owning that id maps to the same singular name.
// this disambiguates 'Bedarf'-as-folder (Kulturen/{kulturId}/Bedarf -
// singular of 'Kulturen' is 'Kultur', not 'Bedarf') from
// 'Bedarf'-as-suffix (.../Bedarf/{bedarfId}/Bedarf)
export const splitObjectNameFromActiveNodeArray = (url: string[]) => {
  if (url.length >= 3) {
    const objectName = url.at(-1)
    const id = url.at(-2)
    const ownerFolder = url.at(-3)
    if (
      typeof objectName === 'string' &&
      typeof id === 'string' &&
      isId(id) &&
      singularOfFolder[ownerFolder as string] === objectName
    ) {
      return {
        activeNodeArray: url.slice(0, -1),
        objectName,
      }
    }
  }
  return { activeNodeArray: url, objectName: undefined }
}
