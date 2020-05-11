import { lieferung_fileModelBase } from "./lieferung_fileModel.base"


/* A graphql query fragment builders for lieferung_fileModel */
export { selectFromlieferung_file, lieferung_fileModelPrimitives, lieferung_fileModelSelector } from "./lieferung_fileModel.base"

/**
 * lieferung_fileModel
 *
 * columns and relationships of "lieferung_file"
 */
export const lieferung_fileModel = lieferung_fileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
