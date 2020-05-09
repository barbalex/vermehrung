import { UserRoleMaxFieldsModelBase } from "./UserRoleMaxFieldsModel.base"


/* A graphql query fragment builders for UserRoleMaxFieldsModel */
export { selectFromUserRoleMaxFields, userRoleMaxFieldsModelPrimitives, UserRoleMaxFieldsModelSelector } from "./UserRoleMaxFieldsModel.base"

/**
 * UserRoleMaxFieldsModel
 *
 * aggregate max on columns
 */
export const UserRoleMaxFieldsModel = UserRoleMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
