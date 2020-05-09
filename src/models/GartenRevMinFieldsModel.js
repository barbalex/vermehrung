import { GartenRevMinFieldsModelBase } from "./GartenRevMinFieldsModel.base"


/* A graphql query fragment builders for GartenRevMinFieldsModel */
export { selectFromGartenRevMinFields, gartenRevMinFieldsModelPrimitives, GartenRevMinFieldsModelSelector } from "./GartenRevMinFieldsModel.base"

/**
 * GartenRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const GartenRevMinFieldsModel = GartenRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
