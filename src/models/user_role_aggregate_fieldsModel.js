import { user_role_aggregate_fieldsModelBase } from "./user_role_aggregate_fieldsModel.base"


/* A graphql query fragment builders for user_role_aggregate_fieldsModel */
export { selectFromuser_role_aggregate_fields, user_role_aggregate_fieldsModelPrimitives, user_role_aggregate_fieldsModelSelector } from "./user_role_aggregate_fieldsModel.base"

/**
 * user_role_aggregate_fieldsModel
 *
 * aggregate fields of "user_role"
 */
export const user_role_aggregate_fieldsModel = user_role_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
