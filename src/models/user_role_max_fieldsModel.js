import { user_role_max_fieldsModelBase } from "./user_role_max_fieldsModel.base"


/* A graphql query fragment builders for user_role_max_fieldsModel */
export { selectFromuser_role_max_fields, user_role_max_fieldsModelPrimitives, user_role_max_fieldsModelSelector } from "./user_role_max_fieldsModel.base"

/**
 * user_role_max_fieldsModel
 *
 * aggregate max on columns
 */
export const user_role_max_fieldsModel = user_role_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
