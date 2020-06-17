import { gv_rev_mutation_responseModelBase } from "./gv_rev_mutation_responseModel.base"


/* A graphql query fragment builders for gv_rev_mutation_responseModel */
export { selectFromgv_rev_mutation_response, gv_rev_mutation_responseModelPrimitives, gv_rev_mutation_responseModelSelector } from "./gv_rev_mutation_responseModel.base"

/**
 * gv_rev_mutation_responseModel
 */
export const gv_rev_mutation_responseModel = gv_rev_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
