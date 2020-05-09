import { user_role_aggregateModelBase } from "./user_role_aggregateModel.base"


/* A graphql query fragment builders for user_role_aggregateModel */
export { selectFromuser_role_aggregate, user_role_aggregateModelPrimitives, user_role_aggregateModelSelector } from "./user_role_aggregateModel.base"

/**
 * user_role_aggregateModel
 *
 * aggregated selection of "user_role"
 */
export const user_role_aggregateModel = user_role_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
