import { SammelLieferungSumFieldsModelBase } from "./SammelLieferungSumFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungSumFieldsModel */
export { selectFromSammelLieferungSumFields, sammelLieferungSumFieldsModelPrimitives, SammelLieferungSumFieldsModelSelector } from "./SammelLieferungSumFieldsModel.base"

/**
 * SammelLieferungSumFieldsModel
 *
 * aggregate sum on columns
 */
export const SammelLieferungSumFieldsModel = SammelLieferungSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
