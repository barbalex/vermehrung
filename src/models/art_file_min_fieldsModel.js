import { art_file_min_fieldsModelBase } from "./art_file_min_fieldsModel.base"


/* A graphql query fragment builders for art_file_min_fieldsModel */
export { selectFromart_file_min_fields, art_file_min_fieldsModelPrimitives, art_file_min_fieldsModelSelector } from "./art_file_min_fieldsModel.base"

/**
 * art_file_min_fieldsModel
 *
 * aggregate min on columns
 */
export const art_file_min_fieldsModel = art_file_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
