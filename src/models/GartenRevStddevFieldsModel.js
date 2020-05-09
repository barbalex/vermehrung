import { GartenRevStddevFieldsModelBase } from "./GartenRevStddevFieldsModel.base"


/* A graphql query fragment builders for GartenRevStddevFieldsModel */
export { selectFromGartenRevStddevFields, gartenRevStddevFieldsModelPrimitives, GartenRevStddevFieldsModelSelector } from "./GartenRevStddevFieldsModel.base"

/**
 * GartenRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const GartenRevStddevFieldsModel = GartenRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
