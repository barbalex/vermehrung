import { art_qk_rev_aggregateModelBase } from "./art_qk_rev_aggregateModel.base"


/* A graphql query fragment builders for art_qk_rev_aggregateModel */
export { selectFromart_qk_rev_aggregate, art_qk_rev_aggregateModelPrimitives, art_qk_rev_aggregateModelSelector } from "./art_qk_rev_aggregateModel.base"

/**
 * art_qk_rev_aggregateModel
 */
export const art_qk_rev_aggregateModel = art_qk_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
