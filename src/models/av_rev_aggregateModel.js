import { av_rev_aggregateModelBase } from "./av_rev_aggregateModel.base"


/* A graphql query fragment builders for av_rev_aggregateModel */
export { selectFromav_rev_aggregate, av_rev_aggregateModelPrimitives, av_rev_aggregateModelSelector } from "./av_rev_aggregateModel.base"

/**
 * av_rev_aggregateModel
 */
export const av_rev_aggregateModel = av_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
