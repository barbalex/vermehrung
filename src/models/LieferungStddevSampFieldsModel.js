import { LieferungStddevSampFieldsModelBase } from "./LieferungStddevSampFieldsModel.base"


/* A graphql query fragment builders for LieferungStddevSampFieldsModel */
export { selectFromLieferungStddevSampFields, lieferungStddevSampFieldsModelPrimitives, LieferungStddevSampFieldsModelSelector } from "./LieferungStddevSampFieldsModel.base"

/**
 * LieferungStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const LieferungStddevSampFieldsModel = LieferungStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
