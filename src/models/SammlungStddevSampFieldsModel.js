import { SammlungStddevSampFieldsModelBase } from "./SammlungStddevSampFieldsModel.base"


/* A graphql query fragment builders for SammlungStddevSampFieldsModel */
export { selectFromSammlungStddevSampFields, sammlungStddevSampFieldsModelPrimitives, SammlungStddevSampFieldsModelSelector } from "./SammlungStddevSampFieldsModel.base"

/**
 * SammlungStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const SammlungStddevSampFieldsModel = SammlungStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
