import { garten_min_fieldsModelBase } from "./garten_min_fieldsModel.base"


/* A graphql query fragment builders for garten_min_fieldsModel */
export { selectFromgarten_min_fields, garten_min_fieldsModelPrimitives, garten_min_fieldsModelSelector } from "./garten_min_fieldsModel.base"

/**
 * garten_min_fieldsModel
 */
export const garten_min_fieldsModel = garten_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
