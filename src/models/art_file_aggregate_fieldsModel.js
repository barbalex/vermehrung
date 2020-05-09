import { art_file_aggregate_fieldsModelBase } from "./art_file_aggregate_fieldsModel.base"


/* A graphql query fragment builders for art_file_aggregate_fieldsModel */
export { selectFromart_file_aggregate_fields, art_file_aggregate_fieldsModelPrimitives, art_file_aggregate_fieldsModelSelector } from "./art_file_aggregate_fieldsModel.base"

/**
 * art_file_aggregate_fieldsModel
 *
 * aggregate fields of "art_file"
 */
export const art_file_aggregate_fieldsModel = art_file_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
