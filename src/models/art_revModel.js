import { art_revModelBase } from "./art_revModel.base"


/* A graphql query fragment builders for art_revModel */
export { selectFromart_rev, art_revModelPrimitives, art_revModelSelector } from "./art_revModel.base"

/**
 * art_revModel
 *
 * columns and relationships of "art_rev"
 */
export const art_revModel = art_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
