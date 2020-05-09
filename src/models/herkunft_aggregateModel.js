import { herkunft_aggregateModelBase } from "./herkunft_aggregateModel.base"


/* A graphql query fragment builders for herkunft_aggregateModel */
export { selectFromherkunft_aggregate, herkunft_aggregateModelPrimitives, herkunft_aggregateModelSelector } from "./herkunft_aggregateModel.base"

/**
 * herkunft_aggregateModel
 *
 * aggregated selection of "herkunft"
 */
export const herkunft_aggregateModel = herkunft_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
