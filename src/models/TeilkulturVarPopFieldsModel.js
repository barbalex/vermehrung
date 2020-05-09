import { TeilkulturVarPopFieldsModelBase } from "./TeilkulturVarPopFieldsModel.base"


/* A graphql query fragment builders for TeilkulturVarPopFieldsModel */
export { selectFromTeilkulturVarPopFields, teilkulturVarPopFieldsModelPrimitives, TeilkulturVarPopFieldsModelSelector } from "./TeilkulturVarPopFieldsModel.base"

/**
 * TeilkulturVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const TeilkulturVarPopFieldsModel = TeilkulturVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
