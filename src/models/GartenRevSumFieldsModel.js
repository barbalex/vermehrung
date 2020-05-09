import { GartenRevSumFieldsModelBase } from "./GartenRevSumFieldsModel.base"


/* A graphql query fragment builders for GartenRevSumFieldsModel */
export { selectFromGartenRevSumFields, gartenRevSumFieldsModelPrimitives, GartenRevSumFieldsModelSelector } from "./GartenRevSumFieldsModel.base"

/**
 * GartenRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const GartenRevSumFieldsModel = GartenRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
