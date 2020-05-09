import { LieferungRevMinFieldsModelBase } from "./LieferungRevMinFieldsModel.base"


/* A graphql query fragment builders for LieferungRevMinFieldsModel */
export { selectFromLieferungRevMinFields, lieferungRevMinFieldsModelPrimitives, LieferungRevMinFieldsModelSelector } from "./LieferungRevMinFieldsModel.base"

/**
 * LieferungRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const LieferungRevMinFieldsModel = LieferungRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
