import { GartenRevMaxFieldsModelBase } from "./GartenRevMaxFieldsModel.base"


/* A graphql query fragment builders for GartenRevMaxFieldsModel */
export { selectFromGartenRevMaxFields, gartenRevMaxFieldsModelPrimitives, GartenRevMaxFieldsModelSelector } from "./GartenRevMaxFieldsModel.base"

/**
 * GartenRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const GartenRevMaxFieldsModel = GartenRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
