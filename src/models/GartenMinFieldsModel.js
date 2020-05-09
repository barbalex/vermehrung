import { GartenMinFieldsModelBase } from "./GartenMinFieldsModel.base"


/* A graphql query fragment builders for GartenMinFieldsModel */
export { selectFromGartenMinFields, gartenMinFieldsModelPrimitives, GartenMinFieldsModelSelector } from "./GartenMinFieldsModel.base"

/**
 * GartenMinFieldsModel
 *
 * aggregate min on columns
 */
export const GartenMinFieldsModel = GartenMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
