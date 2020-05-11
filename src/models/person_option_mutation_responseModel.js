import { person_option_mutation_responseModelBase } from "./person_option_mutation_responseModel.base"


/* A graphql query fragment builders for person_option_mutation_responseModel */
export { selectFromperson_option_mutation_response, person_option_mutation_responseModelPrimitives, person_option_mutation_responseModelSelector } from "./person_option_mutation_responseModel.base"

/**
 * person_option_mutation_responseModel
 *
 * response of any mutation on the table "person_option"
 */
export const person_option_mutation_responseModel = person_option_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
