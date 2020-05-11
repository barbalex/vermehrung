import { art_sums_max_fieldsModelBase } from "./art_sums_max_fieldsModel.base"


/* A graphql query fragment builders for art_sums_max_fieldsModel */
export { selectFromart_sums_max_fields, art_sums_max_fieldsModelPrimitives, art_sums_max_fieldsModelSelector } from "./art_sums_max_fieldsModel.base"

/**
 * art_sums_max_fieldsModel
 *
 * aggregate max on columns
 */
export const art_sums_max_fieldsModel = art_sums_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
