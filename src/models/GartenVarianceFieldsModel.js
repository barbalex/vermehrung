import { GartenVarianceFieldsModelBase } from "./GartenVarianceFieldsModel.base"


/* A graphql query fragment builders for GartenVarianceFieldsModel */
export { selectFromGartenVarianceFields, gartenVarianceFieldsModelPrimitives, GartenVarianceFieldsModelSelector } from "./GartenVarianceFieldsModel.base"

/**
 * GartenVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const GartenVarianceFieldsModel = GartenVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
