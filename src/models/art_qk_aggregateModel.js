import { art_qk_aggregateModelBase } from "./art_qk_aggregateModel.base"


/* A graphql query fragment builders for art_qk_aggregateModel */
export { selectFromart_qk_aggregate, art_qk_aggregateModelPrimitives, art_qk_aggregateModelSelector } from "./art_qk_aggregateModel.base"

/**
 * art_qk_aggregateModel
 *
 * aggregated selection of "art_qk"
 */
export const art_qk_aggregateModel = art_qk_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
