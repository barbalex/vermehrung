import { user_role_avg_fieldsModelBase } from "./user_role_avg_fieldsModel.base"


/* A graphql query fragment builders for user_role_avg_fieldsModel */
export { selectFromuser_role_avg_fields, user_role_avg_fieldsModelPrimitives, user_role_avg_fieldsModelSelector } from "./user_role_avg_fieldsModel.base"

/**
 * user_role_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const user_role_avg_fieldsModel = user_role_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
