import { sammel_lieferung_rev_mutation_responseModelBase } from "./sammel_lieferung_rev_mutation_responseModel.base"


/* A graphql query fragment builders for sammel_lieferung_rev_mutation_responseModel */
export { selectFromsammel_lieferung_rev_mutation_response, sammel_lieferung_rev_mutation_responseModelPrimitives, sammel_lieferung_rev_mutation_responseModelSelector } from "./sammel_lieferung_rev_mutation_responseModel.base"

/**
 * sammel_lieferung_rev_mutation_responseModel
 *
 * response of any mutation on the table "sammel_lieferung_rev"
 */
export const sammel_lieferung_rev_mutation_responseModel = sammel_lieferung_rev_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
