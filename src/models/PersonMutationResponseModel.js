import { PersonMutationResponseModelBase } from "./PersonMutationResponseModel.base"


/* A graphql query fragment builders for PersonMutationResponseModel */
export { selectFromPersonMutationResponse, personMutationResponseModelPrimitives, PersonMutationResponseModelSelector } from "./PersonMutationResponseModel.base"

/**
 * PersonMutationResponseModel
 *
 * response of any mutation on the table "person"
 */
export const PersonMutationResponseModel = PersonMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
