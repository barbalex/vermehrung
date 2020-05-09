import { GartenStddevSampFieldsModelBase } from "./GartenStddevSampFieldsModel.base"


/* A graphql query fragment builders for GartenStddevSampFieldsModel */
export { selectFromGartenStddevSampFields, gartenStddevSampFieldsModelPrimitives, GartenStddevSampFieldsModelSelector } from "./GartenStddevSampFieldsModel.base"

/**
 * GartenStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const GartenStddevSampFieldsModel = GartenStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
