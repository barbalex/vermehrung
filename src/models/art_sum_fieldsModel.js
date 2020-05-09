import { art_sum_fieldsModelBase } from "./art_sum_fieldsModel.base"


/* A graphql query fragment builders for art_sum_fieldsModel */
export { selectFromart_sum_fields, art_sum_fieldsModelPrimitives, art_sum_fieldsModelSelector } from "./art_sum_fieldsModel.base"

/**
 * art_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const art_sum_fieldsModel = art_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
