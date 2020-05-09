import { herkunft_file_aggregateModelBase } from "./herkunft_file_aggregateModel.base"


/* A graphql query fragment builders for herkunft_file_aggregateModel */
export { selectFromherkunft_file_aggregate, herkunft_file_aggregateModelPrimitives, herkunft_file_aggregateModelSelector } from "./herkunft_file_aggregateModel.base"

/**
 * herkunft_file_aggregateModel
 *
 * aggregated selection of "herkunft_file"
 */
export const herkunft_file_aggregateModel = herkunft_file_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
