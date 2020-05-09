import { SammelLieferungRevMaxFieldsModelBase } from "./SammelLieferungRevMaxFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungRevMaxFieldsModel */
export { selectFromSammelLieferungRevMaxFields, sammelLieferungRevMaxFieldsModelPrimitives, SammelLieferungRevMaxFieldsModelSelector } from "./SammelLieferungRevMaxFieldsModel.base"

/**
 * SammelLieferungRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const SammelLieferungRevMaxFieldsModel = SammelLieferungRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
