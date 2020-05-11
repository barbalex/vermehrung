import { garten_variance_fieldsModelBase } from "./garten_variance_fieldsModel.base"


/* A graphql query fragment builders for garten_variance_fieldsModel */
export { selectFromgarten_variance_fields, garten_variance_fieldsModelPrimitives, garten_variance_fieldsModelSelector } from "./garten_variance_fieldsModel.base"

/**
 * garten_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const garten_variance_fieldsModel = garten_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
