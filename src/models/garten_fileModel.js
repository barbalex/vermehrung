import { garten_fileModelBase } from "./garten_fileModel.base"


/* A graphql query fragment builders for garten_fileModel */
export { selectFromgarten_file, garten_fileModelPrimitives, garten_fileModelSelector } from "./garten_fileModel.base"

/**
 * garten_fileModel
 *
 * columns and relationships of "garten_file"
 */
export const garten_fileModel = garten_fileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
