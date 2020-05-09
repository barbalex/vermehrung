import { ArtSumsAggregateModelBase } from "./ArtSumsAggregateModel.base"


/* A graphql query fragment builders for ArtSumsAggregateModel */
export { selectFromArtSumsAggregate, artSumsAggregateModelPrimitives, ArtSumsAggregateModelSelector } from "./ArtSumsAggregateModel.base"

/**
 * ArtSumsAggregateModel
 *
 * aggregated selection of "art_sums"
 */
export const ArtSumsAggregateModel = ArtSumsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
