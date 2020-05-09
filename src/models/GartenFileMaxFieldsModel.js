import { GartenFileMaxFieldsModelBase } from "./GartenFileMaxFieldsModel.base"


/* A graphql query fragment builders for GartenFileMaxFieldsModel */
export { selectFromGartenFileMaxFields, gartenFileMaxFieldsModelPrimitives, GartenFileMaxFieldsModelSelector } from "./GartenFileMaxFieldsModel.base"

/**
 * GartenFileMaxFieldsModel
 *
 * aggregate max on columns
 */
export const GartenFileMaxFieldsModel = GartenFileMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
