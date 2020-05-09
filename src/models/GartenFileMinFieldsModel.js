import { GartenFileMinFieldsModelBase } from "./GartenFileMinFieldsModel.base"


/* A graphql query fragment builders for GartenFileMinFieldsModel */
export { selectFromGartenFileMinFields, gartenFileMinFieldsModelPrimitives, GartenFileMinFieldsModelSelector } from "./GartenFileMinFieldsModel.base"

/**
 * GartenFileMinFieldsModel
 *
 * aggregate min on columns
 */
export const GartenFileMinFieldsModel = GartenFileMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
