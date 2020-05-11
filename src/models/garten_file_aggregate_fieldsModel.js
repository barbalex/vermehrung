import { garten_file_aggregate_fieldsModelBase } from "./garten_file_aggregate_fieldsModel.base"


/* A graphql query fragment builders for garten_file_aggregate_fieldsModel */
export { selectFromgarten_file_aggregate_fields, garten_file_aggregate_fieldsModelPrimitives, garten_file_aggregate_fieldsModelSelector } from "./garten_file_aggregate_fieldsModel.base"

/**
 * garten_file_aggregate_fieldsModel
 *
 * aggregate fields of "garten_file"
 */
export const garten_file_aggregate_fieldsModel = garten_file_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
