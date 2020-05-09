import { ArtAggregateModelBase } from "./ArtAggregateModel.base"


/* A graphql query fragment builders for ArtAggregateModel */
export { selectFromArtAggregate, artAggregateModelPrimitives, ArtAggregateModelSelector } from "./ArtAggregateModel.base"

/**
 * ArtAggregateModel
 *
 * aggregated selection of "art"
 */
export const ArtAggregateModel = ArtAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
