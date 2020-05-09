import { LieferungRevSumFieldsModelBase } from "./LieferungRevSumFieldsModel.base"


/* A graphql query fragment builders for LieferungRevSumFieldsModel */
export { selectFromLieferungRevSumFields, lieferungRevSumFieldsModelPrimitives, LieferungRevSumFieldsModelSelector } from "./LieferungRevSumFieldsModel.base"

/**
 * LieferungRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const LieferungRevSumFieldsModel = LieferungRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
