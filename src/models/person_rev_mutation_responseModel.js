import { person_rev_mutation_responseModelBase } from "./person_rev_mutation_responseModel.base"


/* A graphql query fragment builders for person_rev_mutation_responseModel */
export { selectFromperson_rev_mutation_response, person_rev_mutation_responseModelPrimitives, person_rev_mutation_responseModelSelector } from "./person_rev_mutation_responseModel.base"

/**
 * person_rev_mutation_responseModel
 */
export const person_rev_mutation_responseModel = person_rev_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
