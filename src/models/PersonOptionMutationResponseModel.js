import { PersonOptionMutationResponseModelBase } from "./PersonOptionMutationResponseModel.base"


/* A graphql query fragment builders for PersonOptionMutationResponseModel */
export { selectFromPersonOptionMutationResponse, personOptionMutationResponseModelPrimitives, PersonOptionMutationResponseModelSelector } from "./PersonOptionMutationResponseModel.base"

/**
 * PersonOptionMutationResponseModel
 *
 * response of any mutation on the table "person_option"
 */
export const PersonOptionMutationResponseModel = PersonOptionMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
