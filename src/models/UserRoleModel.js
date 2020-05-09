import { UserRoleModelBase } from "./UserRoleModel.base"


/* A graphql query fragment builders for UserRoleModel */
export { selectFromUserRole, userRoleModelPrimitives, UserRoleModelSelector } from "./UserRoleModel.base"

/**
 * UserRoleModel
 *
 * columns and relationships of "user_role"
 */
export const UserRoleModel = UserRoleModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
