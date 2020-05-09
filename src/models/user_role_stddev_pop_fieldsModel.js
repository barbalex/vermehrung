import { user_role_stddev_pop_fieldsModelBase } from "./user_role_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for user_role_stddev_pop_fieldsModel */
export { selectFromuser_role_stddev_pop_fields, user_role_stddev_pop_fieldsModelPrimitives, user_role_stddev_pop_fieldsModelSelector } from "./user_role_stddev_pop_fieldsModel.base"

/**
 * user_role_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const user_role_stddev_pop_fieldsModel = user_role_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
