import { UserRoleAggregateModelBase } from "./UserRoleAggregateModel.base"


/* A graphql query fragment builders for UserRoleAggregateModel */
export { selectFromUserRoleAggregate, userRoleAggregateModelPrimitives, UserRoleAggregateModelSelector } from "./UserRoleAggregateModel.base"

/**
 * UserRoleAggregateModel
 *
 * aggregated selection of "user_role"
 */
export const UserRoleAggregateModel = UserRoleAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
