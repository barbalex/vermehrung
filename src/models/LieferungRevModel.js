import { LieferungRevModelBase } from "./LieferungRevModel.base"


/* A graphql query fragment builders for LieferungRevModel */
export { selectFromLieferungRev, lieferungRevModelPrimitives, LieferungRevModelSelector } from "./LieferungRevModel.base"

/**
 * LieferungRevModel
 *
 * columns and relationships of "lieferung_rev"
 */
export const LieferungRevModel = LieferungRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
