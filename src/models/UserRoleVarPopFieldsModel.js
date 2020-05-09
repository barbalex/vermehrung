import { UserRoleVarPopFieldsModelBase } from "./UserRoleVarPopFieldsModel.base"


/* A graphql query fragment builders for UserRoleVarPopFieldsModel */
export { selectFromUserRoleVarPopFields, userRoleVarPopFieldsModelPrimitives, UserRoleVarPopFieldsModelSelector } from "./UserRoleVarPopFieldsModel.base"

/**
 * UserRoleVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const UserRoleVarPopFieldsModel = UserRoleVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
