import { ZaehlungRevVarPopFieldsModelBase } from "./ZaehlungRevVarPopFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevVarPopFieldsModel */
export { selectFromZaehlungRevVarPopFields, zaehlungRevVarPopFieldsModelPrimitives, ZaehlungRevVarPopFieldsModelSelector } from "./ZaehlungRevVarPopFieldsModel.base"

/**
 * ZaehlungRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const ZaehlungRevVarPopFieldsModel = ZaehlungRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
