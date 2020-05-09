import { SammelLieferungStddevSampFieldsModelBase } from "./SammelLieferungStddevSampFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungStddevSampFieldsModel */
export { selectFromSammelLieferungStddevSampFields, sammelLieferungStddevSampFieldsModelPrimitives, SammelLieferungStddevSampFieldsModelSelector } from "./SammelLieferungStddevSampFieldsModel.base"

/**
 * SammelLieferungStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const SammelLieferungStddevSampFieldsModel = SammelLieferungStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
