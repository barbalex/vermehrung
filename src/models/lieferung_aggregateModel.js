import { lieferung_aggregateModelBase } from "./lieferung_aggregateModel.base"


/* A graphql query fragment builders for lieferung_aggregateModel */
export { selectFromlieferung_aggregate, lieferung_aggregateModelPrimitives, lieferung_aggregateModelSelector } from "./lieferung_aggregateModel.base"

/**
 * lieferung_aggregateModel
 *
 * aggregated selection of "lieferung"
 */
export const lieferung_aggregateModel = lieferung_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
