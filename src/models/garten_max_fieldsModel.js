import { garten_max_fieldsModelBase } from "./garten_max_fieldsModel.base"


/* A graphql query fragment builders for garten_max_fieldsModel */
export { selectFromgarten_max_fields, garten_max_fieldsModelPrimitives, garten_max_fieldsModelSelector } from "./garten_max_fieldsModel.base"

/**
 * garten_max_fieldsModel
 */
export const garten_max_fieldsModel = garten_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
