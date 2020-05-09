import { GartenRevVarianceFieldsModelBase } from "./GartenRevVarianceFieldsModel.base"


/* A graphql query fragment builders for GartenRevVarianceFieldsModel */
export { selectFromGartenRevVarianceFields, gartenRevVarianceFieldsModelPrimitives, GartenRevVarianceFieldsModelSelector } from "./GartenRevVarianceFieldsModel.base"

/**
 * GartenRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const GartenRevVarianceFieldsModel = GartenRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
