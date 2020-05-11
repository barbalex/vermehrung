import { garten_rev_variance_fieldsModelBase } from "./garten_rev_variance_fieldsModel.base"


/* A graphql query fragment builders for garten_rev_variance_fieldsModel */
export { selectFromgarten_rev_variance_fields, garten_rev_variance_fieldsModelPrimitives, garten_rev_variance_fieldsModelSelector } from "./garten_rev_variance_fieldsModel.base"

/**
 * garten_rev_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const garten_rev_variance_fieldsModel = garten_rev_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
