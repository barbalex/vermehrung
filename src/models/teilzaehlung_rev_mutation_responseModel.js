import { teilzaehlung_rev_mutation_responseModelBase } from "./teilzaehlung_rev_mutation_responseModel.base"


/* A graphql query fragment builders for teilzaehlung_rev_mutation_responseModel */
export { selectFromteilzaehlung_rev_mutation_response, teilzaehlung_rev_mutation_responseModelPrimitives, teilzaehlung_rev_mutation_responseModelSelector } from "./teilzaehlung_rev_mutation_responseModel.base"

/**
 * teilzaehlung_rev_mutation_responseModel
 *
 * response of any mutation on the table "teilzaehlung_rev"
 */
export const teilzaehlung_rev_mutation_responseModel = teilzaehlung_rev_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
