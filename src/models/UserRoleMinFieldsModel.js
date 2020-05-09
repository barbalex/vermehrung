import { UserRoleMinFieldsModelBase } from "./UserRoleMinFieldsModel.base"


/* A graphql query fragment builders for UserRoleMinFieldsModel */
export { selectFromUserRoleMinFields, userRoleMinFieldsModelPrimitives, UserRoleMinFieldsModelSelector } from "./UserRoleMinFieldsModel.base"

/**
 * UserRoleMinFieldsModel
 *
 * aggregate min on columns
 */
export const UserRoleMinFieldsModel = UserRoleMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
