import { UserRoleStddevPopFieldsModelBase } from "./UserRoleStddevPopFieldsModel.base"


/* A graphql query fragment builders for UserRoleStddevPopFieldsModel */
export { selectFromUserRoleStddevPopFields, userRoleStddevPopFieldsModelPrimitives, UserRoleStddevPopFieldsModelSelector } from "./UserRoleStddevPopFieldsModel.base"

/**
 * UserRoleStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const UserRoleStddevPopFieldsModel = UserRoleStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
