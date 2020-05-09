import { TeilkulturRevVarPopFieldsModelBase } from "./TeilkulturRevVarPopFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevVarPopFieldsModel */
export { selectFromTeilkulturRevVarPopFields, teilkulturRevVarPopFieldsModelPrimitives, TeilkulturRevVarPopFieldsModelSelector } from "./TeilkulturRevVarPopFieldsModel.base"

/**
 * TeilkulturRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const TeilkulturRevVarPopFieldsModel = TeilkulturRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
