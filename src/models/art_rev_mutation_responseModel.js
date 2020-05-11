import { art_rev_mutation_responseModelBase } from "./art_rev_mutation_responseModel.base"


/* A graphql query fragment builders for art_rev_mutation_responseModel */
export { selectFromart_rev_mutation_response, art_rev_mutation_responseModelPrimitives, art_rev_mutation_responseModelSelector } from "./art_rev_mutation_responseModel.base"

/**
 * art_rev_mutation_responseModel
 *
 * response of any mutation on the table "art_rev"
 */
export const art_rev_mutation_responseModel = art_rev_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
