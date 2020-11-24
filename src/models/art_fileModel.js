import { art_fileModelBase } from "./art_fileModel.base"


/* A graphql query fragment builders for art_fileModel */
export { selectFromart_file, art_fileModelPrimitives, art_fileModelSelector } from "./art_fileModel.base"

/**
 * art_fileModel
 */
export const art_fileModel = art_fileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
