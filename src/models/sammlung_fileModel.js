import { sammlung_fileModelBase } from "./sammlung_fileModel.base"


/* A graphql query fragment builders for sammlung_fileModel */
export { selectFromsammlung_file, sammlung_fileModelPrimitives, sammlung_fileModelSelector } from "./sammlung_fileModel.base"

/**
 * sammlung_fileModel
 *
 * columns and relationships of "sammlung_file"
 */
export const sammlung_fileModel = sammlung_fileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
