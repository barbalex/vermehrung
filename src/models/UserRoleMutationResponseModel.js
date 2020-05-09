import { UserRoleMutationResponseModelBase } from "./UserRoleMutationResponseModel.base"


/* A graphql query fragment builders for UserRoleMutationResponseModel */
export { selectFromUserRoleMutationResponse, userRoleMutationResponseModelPrimitives, UserRoleMutationResponseModelSelector } from "./UserRoleMutationResponseModel.base"

/**
 * UserRoleMutationResponseModel
 *
 * response of any mutation on the table "user_role"
 */
export const UserRoleMutationResponseModel = UserRoleMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
