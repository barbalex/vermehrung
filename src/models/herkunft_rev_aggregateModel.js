import { herkunft_rev_aggregateModelBase } from "./herkunft_rev_aggregateModel.base"


/* A graphql query fragment builders for herkunft_rev_aggregateModel */
export { selectFromherkunft_rev_aggregate, herkunft_rev_aggregateModelPrimitives, herkunft_rev_aggregateModelSelector } from "./herkunft_rev_aggregateModel.base"

/**
 * herkunft_rev_aggregateModel
 *
 * aggregated selection of "herkunft_rev"
 */
export const herkunft_rev_aggregateModel = herkunft_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
