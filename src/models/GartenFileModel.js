import { GartenFileModelBase } from "./GartenFileModel.base"


/* A graphql query fragment builders for GartenFileModel */
export { selectFromGartenFile, gartenFileModelPrimitives, GartenFileModelSelector } from "./GartenFileModel.base"

/**
 * GartenFileModel
 *
 * columns and relationships of "garten_file"
 */
export const GartenFileModel = GartenFileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
