import { GartenRevStddevSampFieldsModelBase } from "./GartenRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for GartenRevStddevSampFieldsModel */
export { selectFromGartenRevStddevSampFields, gartenRevStddevSampFieldsModelPrimitives, GartenRevStddevSampFieldsModelSelector } from "./GartenRevStddevSampFieldsModel.base"

/**
 * GartenRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const GartenRevStddevSampFieldsModel = GartenRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
