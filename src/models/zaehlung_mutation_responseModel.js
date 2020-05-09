import { zaehlung_mutation_responseModelBase } from "./zaehlung_mutation_responseModel.base"


/* A graphql query fragment builders for zaehlung_mutation_responseModel */
export { selectFromzaehlung_mutation_response, zaehlung_mutation_responseModelPrimitives, zaehlung_mutation_responseModelSelector } from "./zaehlung_mutation_responseModel.base"

/**
 * zaehlung_mutation_responseModel
 *
 * response of any mutation on the table "zaehlung"
 */
export const zaehlung_mutation_responseModel = zaehlung_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
