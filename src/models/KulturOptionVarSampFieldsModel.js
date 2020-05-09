import { KulturOptionVarSampFieldsModelBase } from "./KulturOptionVarSampFieldsModel.base"


/* A graphql query fragment builders for KulturOptionVarSampFieldsModel */
export { selectFromKulturOptionVarSampFields, kulturOptionVarSampFieldsModelPrimitives, KulturOptionVarSampFieldsModelSelector } from "./KulturOptionVarSampFieldsModel.base"

/**
 * KulturOptionVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const KulturOptionVarSampFieldsModel = KulturOptionVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
