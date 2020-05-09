import { PersonOptionRevMutationResponseModelBase } from "./PersonOptionRevMutationResponseModel.base"


/* A graphql query fragment builders for PersonOptionRevMutationResponseModel */
export { selectFromPersonOptionRevMutationResponse, personOptionRevMutationResponseModelPrimitives, PersonOptionRevMutationResponseModelSelector } from "./PersonOptionRevMutationResponseModel.base"

/**
 * PersonOptionRevMutationResponseModel
 *
 * response of any mutation on the table "person_option_rev"
 */
export const PersonOptionRevMutationResponseModel = PersonOptionRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
