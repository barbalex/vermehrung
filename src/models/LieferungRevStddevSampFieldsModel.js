import { LieferungRevStddevSampFieldsModelBase } from "./LieferungRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for LieferungRevStddevSampFieldsModel */
export { selectFromLieferungRevStddevSampFields, lieferungRevStddevSampFieldsModelPrimitives, LieferungRevStddevSampFieldsModelSelector } from "./LieferungRevStddevSampFieldsModel.base"

/**
 * LieferungRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const LieferungRevStddevSampFieldsModel = LieferungRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
