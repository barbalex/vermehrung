import { LieferungRevStddevFieldsModelBase } from "./LieferungRevStddevFieldsModel.base"


/* A graphql query fragment builders for LieferungRevStddevFieldsModel */
export { selectFromLieferungRevStddevFields, lieferungRevStddevFieldsModelPrimitives, LieferungRevStddevFieldsModelSelector } from "./LieferungRevStddevFieldsModel.base"

/**
 * LieferungRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const LieferungRevStddevFieldsModel = LieferungRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
