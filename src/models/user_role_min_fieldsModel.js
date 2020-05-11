import { user_role_min_fieldsModelBase } from "./user_role_min_fieldsModel.base"


/* A graphql query fragment builders for user_role_min_fieldsModel */
export { selectFromuser_role_min_fields, user_role_min_fieldsModelPrimitives, user_role_min_fieldsModelSelector } from "./user_role_min_fieldsModel.base"

/**
 * user_role_min_fieldsModel
 *
 * aggregate min on columns
 */
export const user_role_min_fieldsModel = user_role_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
