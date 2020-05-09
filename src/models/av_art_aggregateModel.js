import { av_art_aggregateModelBase } from "./av_art_aggregateModel.base"


/* A graphql query fragment builders for av_art_aggregateModel */
export { selectFromav_art_aggregate, av_art_aggregateModelPrimitives, av_art_aggregateModelSelector } from "./av_art_aggregateModel.base"

/**
 * av_art_aggregateModel
 *
 * aggregated selection of "av_art"
 */
export const av_art_aggregateModel = av_art_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
