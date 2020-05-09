import { GartenRevModelBase } from "./GartenRevModel.base"


/* A graphql query fragment builders for GartenRevModel */
export { selectFromGartenRev, gartenRevModelPrimitives, GartenRevModelSelector } from "./GartenRevModel.base"

/**
 * GartenRevModel
 *
 * columns and relationships of "garten_rev"
 */
export const GartenRevModel = GartenRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
