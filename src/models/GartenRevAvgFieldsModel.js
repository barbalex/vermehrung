import { GartenRevAvgFieldsModelBase } from "./GartenRevAvgFieldsModel.base"


/* A graphql query fragment builders for GartenRevAvgFieldsModel */
export { selectFromGartenRevAvgFields, gartenRevAvgFieldsModelPrimitives, GartenRevAvgFieldsModelSelector } from "./GartenRevAvgFieldsModel.base"

/**
 * GartenRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const GartenRevAvgFieldsModel = GartenRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
