import { SammlungRevStddevSampFieldsModelBase } from "./SammlungRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for SammlungRevStddevSampFieldsModel */
export { selectFromSammlungRevStddevSampFields, sammlungRevStddevSampFieldsModelPrimitives, SammlungRevStddevSampFieldsModelSelector } from "./SammlungRevStddevSampFieldsModel.base"

/**
 * SammlungRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const SammlungRevStddevSampFieldsModel = SammlungRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
