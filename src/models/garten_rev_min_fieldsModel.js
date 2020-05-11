import { garten_rev_min_fieldsModelBase } from "./garten_rev_min_fieldsModel.base"


/* A graphql query fragment builders for garten_rev_min_fieldsModel */
export { selectFromgarten_rev_min_fields, garten_rev_min_fieldsModelPrimitives, garten_rev_min_fieldsModelSelector } from "./garten_rev_min_fieldsModel.base"

/**
 * garten_rev_min_fieldsModel
 *
 * aggregate min on columns
 */
export const garten_rev_min_fieldsModel = garten_rev_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
