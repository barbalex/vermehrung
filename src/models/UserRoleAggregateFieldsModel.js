import { UserRoleAggregateFieldsModelBase } from "./UserRoleAggregateFieldsModel.base"


/* A graphql query fragment builders for UserRoleAggregateFieldsModel */
export { selectFromUserRoleAggregateFields, userRoleAggregateFieldsModelPrimitives, UserRoleAggregateFieldsModelSelector } from "./UserRoleAggregateFieldsModel.base"

/**
 * UserRoleAggregateFieldsModel
 *
 * aggregate fields of "user_role"
 */
export const UserRoleAggregateFieldsModel = UserRoleAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
