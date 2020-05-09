import { HerkunftVarSampFieldsModelBase } from "./HerkunftVarSampFieldsModel.base"


/* A graphql query fragment builders for HerkunftVarSampFieldsModel */
export { selectFromHerkunftVarSampFields, herkunftVarSampFieldsModelPrimitives, HerkunftVarSampFieldsModelSelector } from "./HerkunftVarSampFieldsModel.base"

/**
 * HerkunftVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const HerkunftVarSampFieldsModel = HerkunftVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
