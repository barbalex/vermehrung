import { LieferungVarianceFieldsModelBase } from "./LieferungVarianceFieldsModel.base"


/* A graphql query fragment builders for LieferungVarianceFieldsModel */
export { selectFromLieferungVarianceFields, lieferungVarianceFieldsModelPrimitives, LieferungVarianceFieldsModelSelector } from "./LieferungVarianceFieldsModel.base"

/**
 * LieferungVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const LieferungVarianceFieldsModel = LieferungVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
