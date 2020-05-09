import { art_file_aggregateModelBase } from "./art_file_aggregateModel.base"


/* A graphql query fragment builders for art_file_aggregateModel */
export { selectFromart_file_aggregate, art_file_aggregateModelPrimitives, art_file_aggregateModelSelector } from "./art_file_aggregateModel.base"

/**
 * art_file_aggregateModel
 *
 * aggregated selection of "art_file"
 */
export const art_file_aggregateModel = art_file_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
