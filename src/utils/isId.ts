import { validate as isValidUuid } from 'uuid'

// ids in urls and activeNodeArray: uuid v7 since the 2026-10-28
// migration, uuid v1 in old bookmarks. both resolve datasets
// (uuid's validate accepts all versions - is-uuid has no v7)
export const isId = (value: string | undefined) => isValidUuid(value)
