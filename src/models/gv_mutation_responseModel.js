import { gv_mutation_responseModelBase } from "./gv_mutation_responseModel.base"


/* A graphql query fragment builders for gv_mutation_responseModel */
export { selectFromgv_mutation_response, gv_mutation_responseModelPrimitives, gv_mutation_responseModelSelector } from "./gv_mutation_responseModel.base"

/**
 * gv_mutation_responseModel
 */
export const gv_mutation_responseModel = gv_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
