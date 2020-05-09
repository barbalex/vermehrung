import { LieferungRevVarSampFieldsModelBase } from "./LieferungRevVarSampFieldsModel.base"


/* A graphql query fragment builders for LieferungRevVarSampFieldsModel */
export { selectFromLieferungRevVarSampFields, lieferungRevVarSampFieldsModelPrimitives, LieferungRevVarSampFieldsModelSelector } from "./LieferungRevVarSampFieldsModel.base"

/**
 * LieferungRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const LieferungRevVarSampFieldsModel = LieferungRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
