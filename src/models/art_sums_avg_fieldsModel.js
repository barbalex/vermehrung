import { art_sums_avg_fieldsModelBase } from "./art_sums_avg_fieldsModel.base"


/* A graphql query fragment builders for art_sums_avg_fieldsModel */
export { selectFromart_sums_avg_fields, art_sums_avg_fieldsModelPrimitives, art_sums_avg_fieldsModelSelector } from "./art_sums_avg_fieldsModel.base"

/**
 * art_sums_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const art_sums_avg_fieldsModel = art_sums_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
