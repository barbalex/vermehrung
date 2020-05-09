import { UserRoleVarSampFieldsModelBase } from "./UserRoleVarSampFieldsModel.base"


/* A graphql query fragment builders for UserRoleVarSampFieldsModel */
export { selectFromUserRoleVarSampFields, userRoleVarSampFieldsModelPrimitives, UserRoleVarSampFieldsModelSelector } from "./UserRoleVarSampFieldsModel.base"

/**
 * UserRoleVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const UserRoleVarSampFieldsModel = UserRoleVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
