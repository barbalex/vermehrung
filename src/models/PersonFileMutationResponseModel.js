import { PersonFileMutationResponseModelBase } from "./PersonFileMutationResponseModel.base"


/* A graphql query fragment builders for PersonFileMutationResponseModel */
export { selectFromPersonFileMutationResponse, personFileMutationResponseModelPrimitives, PersonFileMutationResponseModelSelector } from "./PersonFileMutationResponseModel.base"

/**
 * PersonFileMutationResponseModel
 *
 * response of any mutation on the table "person_file"
 */
export const PersonFileMutationResponseModel = PersonFileMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
