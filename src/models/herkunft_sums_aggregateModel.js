import { herkunft_sums_aggregateModelBase } from "./herkunft_sums_aggregateModel.base"


/* A graphql query fragment builders for herkunft_sums_aggregateModel */
export { selectFromherkunft_sums_aggregate, herkunft_sums_aggregateModelPrimitives, herkunft_sums_aggregateModelSelector } from "./herkunft_sums_aggregateModel.base"

/**
 * herkunft_sums_aggregateModel
 *
 * aggregated selection of "herkunft_sums"
 */
export const herkunft_sums_aggregateModel = herkunft_sums_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
