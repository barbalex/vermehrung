import { HerkunftVarPopFieldsModelBase } from "./HerkunftVarPopFieldsModel.base"


/* A graphql query fragment builders for HerkunftVarPopFieldsModel */
export { selectFromHerkunftVarPopFields, herkunftVarPopFieldsModelPrimitives, HerkunftVarPopFieldsModelSelector } from "./HerkunftVarPopFieldsModel.base"

/**
 * HerkunftVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const HerkunftVarPopFieldsModel = HerkunftVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
