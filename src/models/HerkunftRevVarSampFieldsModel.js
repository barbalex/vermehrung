import { HerkunftRevVarSampFieldsModelBase } from "./HerkunftRevVarSampFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevVarSampFieldsModel */
export { selectFromHerkunftRevVarSampFields, herkunftRevVarSampFieldsModelPrimitives, HerkunftRevVarSampFieldsModelSelector } from "./HerkunftRevVarSampFieldsModel.base"

/**
 * HerkunftRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const HerkunftRevVarSampFieldsModel = HerkunftRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
