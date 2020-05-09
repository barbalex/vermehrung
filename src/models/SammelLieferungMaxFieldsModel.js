import { SammelLieferungMaxFieldsModelBase } from "./SammelLieferungMaxFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungMaxFieldsModel */
export { selectFromSammelLieferungMaxFields, sammelLieferungMaxFieldsModelPrimitives, SammelLieferungMaxFieldsModelSelector } from "./SammelLieferungMaxFieldsModel.base"

/**
 * SammelLieferungMaxFieldsModel
 *
 * aggregate max on columns
 */
export const SammelLieferungMaxFieldsModel = SammelLieferungMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
