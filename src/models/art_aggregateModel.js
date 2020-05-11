import { art_aggregateModelBase } from "./art_aggregateModel.base"


/* A graphql query fragment builders for art_aggregateModel */
export { selectFromart_aggregate, art_aggregateModelPrimitives, art_aggregateModelSelector } from "./art_aggregateModel.base"

/**
 * art_aggregateModel
 *
 * aggregated selection of "art"
 */
export const art_aggregateModel = art_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
