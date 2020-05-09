import { ArtFileAggregateModelBase } from "./ArtFileAggregateModel.base"


/* A graphql query fragment builders for ArtFileAggregateModel */
export { selectFromArtFileAggregate, artFileAggregateModelPrimitives, ArtFileAggregateModelSelector } from "./ArtFileAggregateModel.base"

/**
 * ArtFileAggregateModel
 *
 * aggregated selection of "art_file"
 */
export const ArtFileAggregateModel = ArtFileAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
