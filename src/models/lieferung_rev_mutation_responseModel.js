import { lieferung_rev_mutation_responseModelBase } from "./lieferung_rev_mutation_responseModel.base"


/* A graphql query fragment builders for lieferung_rev_mutation_responseModel */
export { selectFromlieferung_rev_mutation_response, lieferung_rev_mutation_responseModelPrimitives, lieferung_rev_mutation_responseModelSelector } from "./lieferung_rev_mutation_responseModel.base"

/**
 * lieferung_rev_mutation_responseModel
 *
 * response of any mutation on the table "lieferung_rev"
 */
export const lieferung_rev_mutation_responseModel = lieferung_rev_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
