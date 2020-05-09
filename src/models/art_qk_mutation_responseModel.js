import { art_qk_mutation_responseModelBase } from "./art_qk_mutation_responseModel.base"


/* A graphql query fragment builders for art_qk_mutation_responseModel */
export { selectFromart_qk_mutation_response, art_qk_mutation_responseModelPrimitives, art_qk_mutation_responseModelSelector } from "./art_qk_mutation_responseModel.base"

/**
 * art_qk_mutation_responseModel
 *
 * response of any mutation on the table "art_qk"
 */
export const art_qk_mutation_responseModel = art_qk_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
