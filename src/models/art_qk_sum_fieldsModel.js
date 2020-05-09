import { art_qk_sum_fieldsModelBase } from "./art_qk_sum_fieldsModel.base"


/* A graphql query fragment builders for art_qk_sum_fieldsModel */
export { selectFromart_qk_sum_fields, art_qk_sum_fieldsModelPrimitives, art_qk_sum_fieldsModelSelector } from "./art_qk_sum_fieldsModel.base"

/**
 * art_qk_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const art_qk_sum_fieldsModel = art_qk_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
