import { ZaehlungVarPopFieldsModelBase } from "./ZaehlungVarPopFieldsModel.base"


/* A graphql query fragment builders for ZaehlungVarPopFieldsModel */
export { selectFromZaehlungVarPopFields, zaehlungVarPopFieldsModelPrimitives, ZaehlungVarPopFieldsModelSelector } from "./ZaehlungVarPopFieldsModel.base"

/**
 * ZaehlungVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const ZaehlungVarPopFieldsModel = ZaehlungVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
