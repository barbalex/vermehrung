import { GartenMaxFieldsModelBase } from "./GartenMaxFieldsModel.base"


/* A graphql query fragment builders for GartenMaxFieldsModel */
export { selectFromGartenMaxFields, gartenMaxFieldsModelPrimitives, GartenMaxFieldsModelSelector } from "./GartenMaxFieldsModel.base"

/**
 * GartenMaxFieldsModel
 *
 * aggregate max on columns
 */
export const GartenMaxFieldsModel = GartenMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
