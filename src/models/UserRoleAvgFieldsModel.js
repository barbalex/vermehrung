import { UserRoleAvgFieldsModelBase } from "./UserRoleAvgFieldsModel.base"


/* A graphql query fragment builders for UserRoleAvgFieldsModel */
export { selectFromUserRoleAvgFields, userRoleAvgFieldsModelPrimitives, UserRoleAvgFieldsModelSelector } from "./UserRoleAvgFieldsModel.base"

/**
 * UserRoleAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const UserRoleAvgFieldsModel = UserRoleAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
