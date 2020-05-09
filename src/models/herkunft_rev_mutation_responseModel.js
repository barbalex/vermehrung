import { herkunft_rev_mutation_responseModelBase } from "./herkunft_rev_mutation_responseModel.base"


/* A graphql query fragment builders for herkunft_rev_mutation_responseModel */
export { selectFromherkunft_rev_mutation_response, herkunft_rev_mutation_responseModelPrimitives, herkunft_rev_mutation_responseModelSelector } from "./herkunft_rev_mutation_responseModel.base"

/**
 * herkunft_rev_mutation_responseModel
 *
 * response of any mutation on the table "herkunft_rev"
 */
export const herkunft_rev_mutation_responseModel = herkunft_rev_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
