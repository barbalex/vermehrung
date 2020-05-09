import { LieferungFileMinFieldsModelBase } from "./LieferungFileMinFieldsModel.base"


/* A graphql query fragment builders for LieferungFileMinFieldsModel */
export { selectFromLieferungFileMinFields, lieferungFileMinFieldsModelPrimitives, LieferungFileMinFieldsModelSelector } from "./LieferungFileMinFieldsModel.base"

/**
 * LieferungFileMinFieldsModel
 *
 * aggregate min on columns
 */
export const LieferungFileMinFieldsModel = LieferungFileMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
