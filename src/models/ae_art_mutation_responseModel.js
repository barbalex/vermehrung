import { ae_art_mutation_responseModelBase } from "./ae_art_mutation_responseModel.base"


/* A graphql query fragment builders for ae_art_mutation_responseModel */
export { selectFromae_art_mutation_response, ae_art_mutation_responseModelPrimitives, ae_art_mutation_responseModelSelector } from "./ae_art_mutation_responseModel.base"

/**
 * ae_art_mutation_responseModel
 */
export const ae_art_mutation_responseModel = ae_art_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
