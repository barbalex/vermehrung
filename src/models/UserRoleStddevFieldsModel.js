import { UserRoleStddevFieldsModelBase } from "./UserRoleStddevFieldsModel.base"


/* A graphql query fragment builders for UserRoleStddevFieldsModel */
export { selectFromUserRoleStddevFields, userRoleStddevFieldsModelPrimitives, UserRoleStddevFieldsModelSelector } from "./UserRoleStddevFieldsModel.base"

/**
 * UserRoleStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const UserRoleStddevFieldsModel = UserRoleStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
