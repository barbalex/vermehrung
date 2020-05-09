import { LieferungStddevFieldsModelBase } from "./LieferungStddevFieldsModel.base"


/* A graphql query fragment builders for LieferungStddevFieldsModel */
export { selectFromLieferungStddevFields, lieferungStddevFieldsModelPrimitives, LieferungStddevFieldsModelSelector } from "./LieferungStddevFieldsModel.base"

/**
 * LieferungStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const LieferungStddevFieldsModel = LieferungStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
