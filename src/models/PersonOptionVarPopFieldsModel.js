import { PersonOptionVarPopFieldsModelBase } from "./PersonOptionVarPopFieldsModel.base"


/* A graphql query fragment builders for PersonOptionVarPopFieldsModel */
export { selectFromPersonOptionVarPopFields, personOptionVarPopFieldsModelPrimitives, PersonOptionVarPopFieldsModelSelector } from "./PersonOptionVarPopFieldsModel.base"

/**
 * PersonOptionVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const PersonOptionVarPopFieldsModel = PersonOptionVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
