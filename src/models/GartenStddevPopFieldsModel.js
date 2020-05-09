import { GartenStddevPopFieldsModelBase } from "./GartenStddevPopFieldsModel.base"


/* A graphql query fragment builders for GartenStddevPopFieldsModel */
export { selectFromGartenStddevPopFields, gartenStddevPopFieldsModelPrimitives, GartenStddevPopFieldsModelSelector } from "./GartenStddevPopFieldsModel.base"

/**
 * GartenStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const GartenStddevPopFieldsModel = GartenStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
