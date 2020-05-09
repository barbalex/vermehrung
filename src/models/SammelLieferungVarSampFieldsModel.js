import { SammelLieferungVarSampFieldsModelBase } from "./SammelLieferungVarSampFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungVarSampFieldsModel */
export { selectFromSammelLieferungVarSampFields, sammelLieferungVarSampFieldsModelPrimitives, SammelLieferungVarSampFieldsModelSelector } from "./SammelLieferungVarSampFieldsModel.base"

/**
 * SammelLieferungVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const SammelLieferungVarSampFieldsModel = SammelLieferungVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
