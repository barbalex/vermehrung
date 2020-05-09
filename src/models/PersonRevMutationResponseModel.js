import { PersonRevMutationResponseModelBase } from "./PersonRevMutationResponseModel.base"


/* A graphql query fragment builders for PersonRevMutationResponseModel */
export { selectFromPersonRevMutationResponse, personRevMutationResponseModelPrimitives, PersonRevMutationResponseModelSelector } from "./PersonRevMutationResponseModel.base"

/**
 * PersonRevMutationResponseModel
 *
 * response of any mutation on the table "person_rev"
 */
export const PersonRevMutationResponseModel = PersonRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
