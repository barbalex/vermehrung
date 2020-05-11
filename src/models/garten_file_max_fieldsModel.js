import { garten_file_max_fieldsModelBase } from "./garten_file_max_fieldsModel.base"


/* A graphql query fragment builders for garten_file_max_fieldsModel */
export { selectFromgarten_file_max_fields, garten_file_max_fieldsModelPrimitives, garten_file_max_fieldsModelSelector } from "./garten_file_max_fieldsModel.base"

/**
 * garten_file_max_fieldsModel
 *
 * aggregate max on columns
 */
export const garten_file_max_fieldsModel = garten_file_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
