import { lieferung_mutation_responseModelBase } from "./lieferung_mutation_responseModel.base"


/* A graphql query fragment builders for lieferung_mutation_responseModel */
export { selectFromlieferung_mutation_response, lieferung_mutation_responseModelPrimitives, lieferung_mutation_responseModelSelector } from "./lieferung_mutation_responseModel.base"

/**
 * lieferung_mutation_responseModel
 *
 * response of any mutation on the table "lieferung"
 */
export const lieferung_mutation_responseModel = lieferung_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
