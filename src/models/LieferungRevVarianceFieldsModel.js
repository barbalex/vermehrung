import { LieferungRevVarianceFieldsModelBase } from "./LieferungRevVarianceFieldsModel.base"


/* A graphql query fragment builders for LieferungRevVarianceFieldsModel */
export { selectFromLieferungRevVarianceFields, lieferungRevVarianceFieldsModelPrimitives, LieferungRevVarianceFieldsModelSelector } from "./LieferungRevVarianceFieldsModel.base"

/**
 * LieferungRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const LieferungRevVarianceFieldsModel = LieferungRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
