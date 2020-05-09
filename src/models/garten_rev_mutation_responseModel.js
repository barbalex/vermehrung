import { garten_rev_mutation_responseModelBase } from "./garten_rev_mutation_responseModel.base"


/* A graphql query fragment builders for garten_rev_mutation_responseModel */
export { selectFromgarten_rev_mutation_response, garten_rev_mutation_responseModelPrimitives, garten_rev_mutation_responseModelSelector } from "./garten_rev_mutation_responseModel.base"

/**
 * garten_rev_mutation_responseModel
 *
 * response of any mutation on the table "garten_rev"
 */
export const garten_rev_mutation_responseModel = garten_rev_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
