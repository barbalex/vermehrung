import { art_sums_min_fieldsModelBase } from "./art_sums_min_fieldsModel.base"


/* A graphql query fragment builders for art_sums_min_fieldsModel */
export { selectFromart_sums_min_fields, art_sums_min_fieldsModelPrimitives, art_sums_min_fieldsModelSelector } from "./art_sums_min_fieldsModel.base"

/**
 * art_sums_min_fieldsModel
 *
 * aggregate min on columns
 */
export const art_sums_min_fieldsModel = art_sums_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
