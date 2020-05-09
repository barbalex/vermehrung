import { art_file_max_fieldsModelBase } from "./art_file_max_fieldsModel.base"


/* A graphql query fragment builders for art_file_max_fieldsModel */
export { selectFromart_file_max_fields, art_file_max_fieldsModelPrimitives, art_file_max_fieldsModelSelector } from "./art_file_max_fieldsModel.base"

/**
 * art_file_max_fieldsModel
 *
 * aggregate max on columns
 */
export const art_file_max_fieldsModel = art_file_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
