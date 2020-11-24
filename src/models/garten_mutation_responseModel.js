import { garten_mutation_responseModelBase } from "./garten_mutation_responseModel.base"


/* A graphql query fragment builders for garten_mutation_responseModel */
export { selectFromgarten_mutation_response, garten_mutation_responseModelPrimitives, garten_mutation_responseModelSelector } from "./garten_mutation_responseModel.base"

/**
 * garten_mutation_responseModel
 */
export const garten_mutation_responseModel = garten_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
