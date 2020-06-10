import { av_aggregateModelBase } from "./av_aggregateModel.base"


/* A graphql query fragment builders for av_aggregateModel */
export { selectFromav_aggregate, av_aggregateModelPrimitives, av_aggregateModelSelector } from "./av_aggregateModel.base"

/**
 * av_aggregateModel
 */
export const av_aggregateModel = av_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
