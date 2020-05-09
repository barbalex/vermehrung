import { KulturVarSampFieldsModelBase } from "./KulturVarSampFieldsModel.base"


/* A graphql query fragment builders for KulturVarSampFieldsModel */
export { selectFromKulturVarSampFields, kulturVarSampFieldsModelPrimitives, KulturVarSampFieldsModelSelector } from "./KulturVarSampFieldsModel.base"

/**
 * KulturVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const KulturVarSampFieldsModel = KulturVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
