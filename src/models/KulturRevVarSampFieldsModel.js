import { KulturRevVarSampFieldsModelBase } from "./KulturRevVarSampFieldsModel.base"


/* A graphql query fragment builders for KulturRevVarSampFieldsModel */
export { selectFromKulturRevVarSampFields, kulturRevVarSampFieldsModelPrimitives, KulturRevVarSampFieldsModelSelector } from "./KulturRevVarSampFieldsModel.base"

/**
 * KulturRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const KulturRevVarSampFieldsModel = KulturRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
