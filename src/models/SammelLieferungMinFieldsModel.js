import { SammelLieferungMinFieldsModelBase } from "./SammelLieferungMinFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungMinFieldsModel */
export { selectFromSammelLieferungMinFields, sammelLieferungMinFieldsModelPrimitives, SammelLieferungMinFieldsModelSelector } from "./SammelLieferungMinFieldsModel.base"

/**
 * SammelLieferungMinFieldsModel
 *
 * aggregate min on columns
 */
export const SammelLieferungMinFieldsModel = SammelLieferungMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
