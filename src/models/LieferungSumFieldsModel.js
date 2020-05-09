import { LieferungSumFieldsModelBase } from "./LieferungSumFieldsModel.base"


/* A graphql query fragment builders for LieferungSumFieldsModel */
export { selectFromLieferungSumFields, lieferungSumFieldsModelPrimitives, LieferungSumFieldsModelSelector } from "./LieferungSumFieldsModel.base"

/**
 * LieferungSumFieldsModel
 *
 * aggregate sum on columns
 */
export const LieferungSumFieldsModel = LieferungSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
