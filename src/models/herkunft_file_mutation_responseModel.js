import { herkunft_file_mutation_responseModelBase } from "./herkunft_file_mutation_responseModel.base"


/* A graphql query fragment builders for herkunft_file_mutation_responseModel */
export { selectFromherkunft_file_mutation_response, herkunft_file_mutation_responseModelPrimitives, herkunft_file_mutation_responseModelSelector } from "./herkunft_file_mutation_responseModel.base"

/**
 * herkunft_file_mutation_responseModel
 *
 * response of any mutation on the table "herkunft_file"
 */
export const herkunft_file_mutation_responseModel = herkunft_file_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
