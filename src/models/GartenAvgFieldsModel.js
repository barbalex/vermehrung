import { GartenAvgFieldsModelBase } from "./GartenAvgFieldsModel.base"


/* A graphql query fragment builders for GartenAvgFieldsModel */
export { selectFromGartenAvgFields, gartenAvgFieldsModelPrimitives, GartenAvgFieldsModelSelector } from "./GartenAvgFieldsModel.base"

/**
 * GartenAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const GartenAvgFieldsModel = GartenAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
