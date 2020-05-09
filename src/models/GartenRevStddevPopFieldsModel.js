import { GartenRevStddevPopFieldsModelBase } from "./GartenRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for GartenRevStddevPopFieldsModel */
export { selectFromGartenRevStddevPopFields, gartenRevStddevPopFieldsModelPrimitives, GartenRevStddevPopFieldsModelSelector } from "./GartenRevStddevPopFieldsModel.base"

/**
 * GartenRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const GartenRevStddevPopFieldsModel = GartenRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
