import { herkunft_fileModelBase } from "./herkunft_fileModel.base"


/* A graphql query fragment builders for herkunft_fileModel */
export { selectFromherkunft_file, herkunft_fileModelPrimitives, herkunft_fileModelSelector } from "./herkunft_fileModel.base"

/**
 * herkunft_fileModel
 *
 * columns and relationships of "herkunft_file"
 */
export const herkunft_fileModel = herkunft_fileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
