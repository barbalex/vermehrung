import { garten_sum_fieldsModelBase } from "./garten_sum_fieldsModel.base"


/* A graphql query fragment builders for garten_sum_fieldsModel */
export { selectFromgarten_sum_fields, garten_sum_fieldsModelPrimitives, garten_sum_fieldsModelSelector } from "./garten_sum_fieldsModel.base"

/**
 * garten_sum_fieldsModel
 */
export const garten_sum_fieldsModel = garten_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
