import { PersonRevVarPopFieldsModelBase } from "./PersonRevVarPopFieldsModel.base"


/* A graphql query fragment builders for PersonRevVarPopFieldsModel */
export { selectFromPersonRevVarPopFields, personRevVarPopFieldsModelPrimitives, PersonRevVarPopFieldsModelSelector } from "./PersonRevVarPopFieldsModel.base"

/**
 * PersonRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const PersonRevVarPopFieldsModel = PersonRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
