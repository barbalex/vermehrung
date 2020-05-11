import { person_file_mutation_responseModelBase } from "./person_file_mutation_responseModel.base"


/* A graphql query fragment builders for person_file_mutation_responseModel */
export { selectFromperson_file_mutation_response, person_file_mutation_responseModelPrimitives, person_file_mutation_responseModelSelector } from "./person_file_mutation_responseModel.base"

/**
 * person_file_mutation_responseModel
 *
 * response of any mutation on the table "person_file"
 */
export const person_file_mutation_responseModel = person_file_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
