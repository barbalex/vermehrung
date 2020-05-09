import { LieferungMinFieldsModelBase } from "./LieferungMinFieldsModel.base"


/* A graphql query fragment builders for LieferungMinFieldsModel */
export { selectFromLieferungMinFields, lieferungMinFieldsModelPrimitives, LieferungMinFieldsModelSelector } from "./LieferungMinFieldsModel.base"

/**
 * LieferungMinFieldsModel
 *
 * aggregate min on columns
 */
export const LieferungMinFieldsModel = LieferungMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
