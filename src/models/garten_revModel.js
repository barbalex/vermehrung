import { garten_revModelBase } from "./garten_revModel.base"


/* A graphql query fragment builders for garten_revModel */
export { selectFromgarten_rev, garten_revModelPrimitives, garten_revModelSelector } from "./garten_revModel.base"

/**
 * garten_revModel
 *
 * columns and relationships of "garten_rev"
 */
export const garten_revModel = garten_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
