import { herkunft_mutation_responseModelBase } from "./herkunft_mutation_responseModel.base"


/* A graphql query fragment builders for herkunft_mutation_responseModel */
export { selectFromherkunft_mutation_response, herkunft_mutation_responseModelPrimitives, herkunft_mutation_responseModelSelector } from "./herkunft_mutation_responseModel.base"

/**
 * herkunft_mutation_responseModel
 *
 * response of any mutation on the table "herkunft"
 */
export const herkunft_mutation_responseModel = herkunft_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
