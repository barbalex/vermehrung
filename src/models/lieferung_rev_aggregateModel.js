import { lieferung_rev_aggregateModelBase } from "./lieferung_rev_aggregateModel.base"


/* A graphql query fragment builders for lieferung_rev_aggregateModel */
export { selectFromlieferung_rev_aggregate, lieferung_rev_aggregateModelPrimitives, lieferung_rev_aggregateModelSelector } from "./lieferung_rev_aggregateModel.base"

/**
 * lieferung_rev_aggregateModel
 *
 * aggregated selection of "lieferung_rev"
 */
export const lieferung_rev_aggregateModel = lieferung_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
