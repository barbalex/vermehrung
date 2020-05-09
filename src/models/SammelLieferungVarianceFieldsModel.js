import { SammelLieferungVarianceFieldsModelBase } from "./SammelLieferungVarianceFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungVarianceFieldsModel */
export { selectFromSammelLieferungVarianceFields, sammelLieferungVarianceFieldsModelPrimitives, SammelLieferungVarianceFieldsModelSelector } from "./SammelLieferungVarianceFieldsModel.base"

/**
 * SammelLieferungVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const SammelLieferungVarianceFieldsModel = SammelLieferungVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
