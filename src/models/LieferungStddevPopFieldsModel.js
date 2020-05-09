import { LieferungStddevPopFieldsModelBase } from "./LieferungStddevPopFieldsModel.base"


/* A graphql query fragment builders for LieferungStddevPopFieldsModel */
export { selectFromLieferungStddevPopFields, lieferungStddevPopFieldsModelPrimitives, LieferungStddevPopFieldsModelSelector } from "./LieferungStddevPopFieldsModel.base"

/**
 * LieferungStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const LieferungStddevPopFieldsModel = LieferungStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
