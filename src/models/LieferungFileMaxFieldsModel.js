import { LieferungFileMaxFieldsModelBase } from "./LieferungFileMaxFieldsModel.base"


/* A graphql query fragment builders for LieferungFileMaxFieldsModel */
export { selectFromLieferungFileMaxFields, lieferungFileMaxFieldsModelPrimitives, LieferungFileMaxFieldsModelSelector } from "./LieferungFileMaxFieldsModel.base"

/**
 * LieferungFileMaxFieldsModel
 *
 * aggregate max on columns
 */
export const LieferungFileMaxFieldsModel = LieferungFileMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
