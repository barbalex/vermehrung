import { TeilzaehlungRevVarPopFieldsModelBase } from "./TeilzaehlungRevVarPopFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevVarPopFieldsModel */
export { selectFromTeilzaehlungRevVarPopFields, teilzaehlungRevVarPopFieldsModelPrimitives, TeilzaehlungRevVarPopFieldsModelSelector } from "./TeilzaehlungRevVarPopFieldsModel.base"

/**
 * TeilzaehlungRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const TeilzaehlungRevVarPopFieldsModel = TeilzaehlungRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
