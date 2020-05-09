import { art_mutation_responseModelBase } from "./art_mutation_responseModel.base"


/* A graphql query fragment builders for art_mutation_responseModel */
export { selectFromart_mutation_response, art_mutation_responseModelPrimitives, art_mutation_responseModelSelector } from "./art_mutation_responseModel.base"

/**
 * art_mutation_responseModel
 *
 * response of any mutation on the table "art"
 */
export const art_mutation_responseModel = art_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
