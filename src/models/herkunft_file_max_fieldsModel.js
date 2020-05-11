import { herkunft_file_max_fieldsModelBase } from "./herkunft_file_max_fieldsModel.base"


/* A graphql query fragment builders for herkunft_file_max_fieldsModel */
export { selectFromherkunft_file_max_fields, herkunft_file_max_fieldsModelPrimitives, herkunft_file_max_fieldsModelSelector } from "./herkunft_file_max_fieldsModel.base"

/**
 * herkunft_file_max_fieldsModel
 *
 * aggregate max on columns
 */
export const herkunft_file_max_fieldsModel = herkunft_file_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
