import { user_role_mutation_responseModelBase } from "./user_role_mutation_responseModel.base"


/* A graphql query fragment builders for user_role_mutation_responseModel */
export { selectFromuser_role_mutation_response, user_role_mutation_responseModelPrimitives, user_role_mutation_responseModelSelector } from "./user_role_mutation_responseModel.base"

/**
 * user_role_mutation_responseModel
 */
export const user_role_mutation_responseModel = user_role_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
