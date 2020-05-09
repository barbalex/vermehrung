import { KulturQkVarSampFieldsModelBase } from "./KulturQkVarSampFieldsModel.base"


/* A graphql query fragment builders for KulturQkVarSampFieldsModel */
export { selectFromKulturQkVarSampFields, kulturQkVarSampFieldsModelPrimitives, KulturQkVarSampFieldsModelSelector } from "./KulturQkVarSampFieldsModel.base"

/**
 * KulturQkVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const KulturQkVarSampFieldsModel = KulturQkVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
