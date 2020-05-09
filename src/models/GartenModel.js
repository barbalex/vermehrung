import { GartenModelBase } from "./GartenModel.base"


/* A graphql query fragment builders for GartenModel */
export { selectFromGarten, gartenModelPrimitives, GartenModelSelector } from "./GartenModel.base"

/**
 * GartenModel
 *
 * columns and relationships of "garten"
 */
export const GartenModel = GartenModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
