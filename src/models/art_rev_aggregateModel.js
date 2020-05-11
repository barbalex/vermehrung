import { art_rev_aggregateModelBase } from "./art_rev_aggregateModel.base"


/* A graphql query fragment builders for art_rev_aggregateModel */
export { selectFromart_rev_aggregate, art_rev_aggregateModelPrimitives, art_rev_aggregateModelSelector } from "./art_rev_aggregateModel.base"

/**
 * art_rev_aggregateModel
 *
 * aggregated selection of "art_rev"
 */
export const art_rev_aggregateModel = art_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
