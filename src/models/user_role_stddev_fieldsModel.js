import { user_role_stddev_fieldsModelBase } from "./user_role_stddev_fieldsModel.base"


/* A graphql query fragment builders for user_role_stddev_fieldsModel */
export { selectFromuser_role_stddev_fields, user_role_stddev_fieldsModelPrimitives, user_role_stddev_fieldsModelSelector } from "./user_role_stddev_fieldsModel.base"

/**
 * user_role_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const user_role_stddev_fieldsModel = user_role_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
