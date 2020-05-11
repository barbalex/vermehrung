import { art_sums_sum_fieldsModelBase } from "./art_sums_sum_fieldsModel.base"


/* A graphql query fragment builders for art_sums_sum_fieldsModel */
export { selectFromart_sums_sum_fields, art_sums_sum_fieldsModelPrimitives, art_sums_sum_fieldsModelSelector } from "./art_sums_sum_fieldsModel.base"

/**
 * art_sums_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const art_sums_sum_fieldsModel = art_sums_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
