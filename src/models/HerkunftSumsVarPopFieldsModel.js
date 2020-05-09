import { HerkunftSumsVarPopFieldsModelBase } from "./HerkunftSumsVarPopFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsVarPopFieldsModel */
export { selectFromHerkunftSumsVarPopFields, herkunftSumsVarPopFieldsModelPrimitives, HerkunftSumsVarPopFieldsModelSelector } from "./HerkunftSumsVarPopFieldsModel.base"

/**
 * HerkunftSumsVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const HerkunftSumsVarPopFieldsModel = HerkunftSumsVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
