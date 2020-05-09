import { SammelLieferungRevMinFieldsModelBase } from "./SammelLieferungRevMinFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungRevMinFieldsModel */
export { selectFromSammelLieferungRevMinFields, sammelLieferungRevMinFieldsModelPrimitives, SammelLieferungRevMinFieldsModelSelector } from "./SammelLieferungRevMinFieldsModel.base"

/**
 * SammelLieferungRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const SammelLieferungRevMinFieldsModel = SammelLieferungRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
