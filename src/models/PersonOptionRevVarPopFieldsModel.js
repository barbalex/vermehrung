import { PersonOptionRevVarPopFieldsModelBase } from "./PersonOptionRevVarPopFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevVarPopFieldsModel */
export { selectFromPersonOptionRevVarPopFields, personOptionRevVarPopFieldsModelPrimitives, PersonOptionRevVarPopFieldsModelSelector } from "./PersonOptionRevVarPopFieldsModel.base"

/**
 * PersonOptionRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const PersonOptionRevVarPopFieldsModel = PersonOptionRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
