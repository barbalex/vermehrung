import { LieferungVarSampFieldsModelBase } from "./LieferungVarSampFieldsModel.base"


/* A graphql query fragment builders for LieferungVarSampFieldsModel */
export { selectFromLieferungVarSampFields, lieferungVarSampFieldsModelPrimitives, LieferungVarSampFieldsModelSelector } from "./LieferungVarSampFieldsModel.base"

/**
 * LieferungVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const LieferungVarSampFieldsModel = LieferungVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
