import { person_mutation_responseModelBase } from "./person_mutation_responseModel.base"


/* A graphql query fragment builders for person_mutation_responseModel */
export { selectFromperson_mutation_response, person_mutation_responseModelPrimitives, person_mutation_responseModelSelector } from "./person_mutation_responseModel.base"

/**
 * person_mutation_responseModel
 *
 * response of any mutation on the table "person"
 */
export const person_mutation_responseModel = person_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
