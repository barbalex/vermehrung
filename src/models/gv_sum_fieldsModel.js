import { gv_sum_fieldsModelBase } from "./gv_sum_fieldsModel.base"


/* A graphql query fragment builders for gv_sum_fieldsModel */
export { selectFromgv_sum_fields, gv_sum_fieldsModelPrimitives, gv_sum_fieldsModelSelector } from "./gv_sum_fieldsModel.base"

/**
 * gv_sum_fieldsModel
 */
export const gv_sum_fieldsModel = gv_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
