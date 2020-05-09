import { SammelLieferungRevStddevSampFieldsModelBase } from "./SammelLieferungRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungRevStddevSampFieldsModel */
export { selectFromSammelLieferungRevStddevSampFields, sammelLieferungRevStddevSampFieldsModelPrimitives, SammelLieferungRevStddevSampFieldsModelSelector } from "./SammelLieferungRevStddevSampFieldsModel.base"

/**
 * SammelLieferungRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const SammelLieferungRevStddevSampFieldsModel = SammelLieferungRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
