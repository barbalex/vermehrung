import { AvArtAggregateModelBase } from "./AvArtAggregateModel.base"


/* A graphql query fragment builders for AvArtAggregateModel */
export { selectFromAvArtAggregate, avArtAggregateModelPrimitives, AvArtAggregateModelSelector } from "./AvArtAggregateModel.base"

/**
 * AvArtAggregateModel
 *
 * aggregated selection of "av_art"
 */
export const AvArtAggregateModel = AvArtAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
