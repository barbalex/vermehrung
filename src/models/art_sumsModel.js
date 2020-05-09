import { art_sumsModelBase } from "./art_sumsModel.base"


/* A graphql query fragment builders for art_sumsModel */
export { selectFromart_sums, art_sumsModelPrimitives, art_sumsModelSelector } from "./art_sumsModel.base"

/**
 * art_sumsModel
 *
 * columns and relationships of "art_sums"
 */
export const art_sumsModel = art_sumsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
