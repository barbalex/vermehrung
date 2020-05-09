import { art_sums_aggregateModelBase } from "./art_sums_aggregateModel.base"


/* A graphql query fragment builders for art_sums_aggregateModel */
export { selectFromart_sums_aggregate, art_sums_aggregateModelPrimitives, art_sums_aggregateModelSelector } from "./art_sums_aggregateModel.base"

/**
 * art_sums_aggregateModel
 *
 * aggregated selection of "art_sums"
 */
export const art_sums_aggregateModel = art_sums_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
