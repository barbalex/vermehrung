import { ArtRevAggregateModelBase } from "./ArtRevAggregateModel.base"


/* A graphql query fragment builders for ArtRevAggregateModel */
export { selectFromArtRevAggregate, artRevAggregateModelPrimitives, ArtRevAggregateModelSelector } from "./ArtRevAggregateModel.base"

/**
 * ArtRevAggregateModel
 *
 * aggregated selection of "art_rev"
 */
export const ArtRevAggregateModel = ArtRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
