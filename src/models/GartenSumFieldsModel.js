import { GartenSumFieldsModelBase } from "./GartenSumFieldsModel.base"


/* A graphql query fragment builders for GartenSumFieldsModel */
export { selectFromGartenSumFields, gartenSumFieldsModelPrimitives, GartenSumFieldsModelSelector } from "./GartenSumFieldsModel.base"

/**
 * GartenSumFieldsModel
 *
 * aggregate sum on columns
 */
export const GartenSumFieldsModel = GartenSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
