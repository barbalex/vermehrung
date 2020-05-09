import { garten_rev_sum_fieldsModelBase } from "./garten_rev_sum_fieldsModel.base"


/* A graphql query fragment builders for garten_rev_sum_fieldsModel */
export { selectFromgarten_rev_sum_fields, garten_rev_sum_fieldsModelPrimitives, garten_rev_sum_fieldsModelSelector } from "./garten_rev_sum_fieldsModel.base"

/**
 * garten_rev_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const garten_rev_sum_fieldsModel = garten_rev_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
