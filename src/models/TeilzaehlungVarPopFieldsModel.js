import { TeilzaehlungVarPopFieldsModelBase } from "./TeilzaehlungVarPopFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungVarPopFieldsModel */
export { selectFromTeilzaehlungVarPopFields, teilzaehlungVarPopFieldsModelPrimitives, TeilzaehlungVarPopFieldsModelSelector } from "./TeilzaehlungVarPopFieldsModel.base"

/**
 * TeilzaehlungVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const TeilzaehlungVarPopFieldsModel = TeilzaehlungVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
