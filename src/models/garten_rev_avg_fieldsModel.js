import { garten_rev_avg_fieldsModelBase } from "./garten_rev_avg_fieldsModel.base"


/* A graphql query fragment builders for garten_rev_avg_fieldsModel */
export { selectFromgarten_rev_avg_fields, garten_rev_avg_fieldsModelPrimitives, garten_rev_avg_fieldsModelSelector } from "./garten_rev_avg_fieldsModel.base"

/**
 * garten_rev_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const garten_rev_avg_fieldsModel = garten_rev_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
