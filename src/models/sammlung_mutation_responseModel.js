import { sammlung_mutation_responseModelBase } from "./sammlung_mutation_responseModel.base"


/* A graphql query fragment builders for sammlung_mutation_responseModel */
export { selectFromsammlung_mutation_response, sammlung_mutation_responseModelPrimitives, sammlung_mutation_responseModelSelector } from "./sammlung_mutation_responseModel.base"

/**
 * sammlung_mutation_responseModel
 *
 * response of any mutation on the table "sammlung"
 */
export const sammlung_mutation_responseModel = sammlung_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
