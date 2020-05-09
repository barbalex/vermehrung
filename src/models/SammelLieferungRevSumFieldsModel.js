import { SammelLieferungRevSumFieldsModelBase } from "./SammelLieferungRevSumFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungRevSumFieldsModel */
export { selectFromSammelLieferungRevSumFields, sammelLieferungRevSumFieldsModelPrimitives, SammelLieferungRevSumFieldsModelSelector } from "./SammelLieferungRevSumFieldsModel.base"

/**
 * SammelLieferungRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const SammelLieferungRevSumFieldsModel = SammelLieferungRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
