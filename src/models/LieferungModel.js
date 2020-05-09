import { LieferungModelBase } from "./LieferungModel.base"


/* A graphql query fragment builders for LieferungModel */
export { selectFromLieferung, lieferungModelPrimitives, LieferungModelSelector } from "./LieferungModel.base"

/**
 * LieferungModel
 *
 * columns and relationships of "lieferung"
 */
export const LieferungModel = LieferungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
