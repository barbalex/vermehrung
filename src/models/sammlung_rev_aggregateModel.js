import { sammlung_rev_aggregateModelBase } from "./sammlung_rev_aggregateModel.base"


/* A graphql query fragment builders for sammlung_rev_aggregateModel */
export { selectFromsammlung_rev_aggregate, sammlung_rev_aggregateModelPrimitives, sammlung_rev_aggregateModelSelector } from "./sammlung_rev_aggregateModel.base"

/**
 * sammlung_rev_aggregateModel
 *
 * aggregated selection of "sammlung_rev"
 */
export const sammlung_rev_aggregateModel = sammlung_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
