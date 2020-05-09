import { GartenStddevFieldsModelBase } from "./GartenStddevFieldsModel.base"


/* A graphql query fragment builders for GartenStddevFieldsModel */
export { selectFromGartenStddevFields, gartenStddevFieldsModelPrimitives, GartenStddevFieldsModelSelector } from "./GartenStddevFieldsModel.base"

/**
 * GartenStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const GartenStddevFieldsModel = GartenStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
