import { PersonVarPopFieldsModelBase } from "./PersonVarPopFieldsModel.base"


/* A graphql query fragment builders for PersonVarPopFieldsModel */
export { selectFromPersonVarPopFields, personVarPopFieldsModelPrimitives, PersonVarPopFieldsModelSelector } from "./PersonVarPopFieldsModel.base"

/**
 * PersonVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const PersonVarPopFieldsModel = PersonVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
