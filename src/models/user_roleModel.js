import { user_roleModelBase } from "./user_roleModel.base"


/* A graphql query fragment builders for user_roleModel */
export { selectFromuser_role, user_roleModelPrimitives, user_roleModelSelector } from "./user_roleModel.base"

/**
 * user_roleModel
 *
 * columns and relationships of "user_role"
 */
export const user_roleModel = user_roleModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
