import { HerkunftSumsVarSampFieldsModelBase } from "./HerkunftSumsVarSampFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsVarSampFieldsModel */
export { selectFromHerkunftSumsVarSampFields, herkunftSumsVarSampFieldsModelPrimitives, HerkunftSumsVarSampFieldsModelSelector } from "./HerkunftSumsVarSampFieldsModel.base"

/**
 * HerkunftSumsVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const HerkunftSumsVarSampFieldsModel = HerkunftSumsVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
