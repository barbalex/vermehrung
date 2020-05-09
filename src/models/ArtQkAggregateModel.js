import { ArtQkAggregateModelBase } from "./ArtQkAggregateModel.base"


/* A graphql query fragment builders for ArtQkAggregateModel */
export { selectFromArtQkAggregate, artQkAggregateModelPrimitives, ArtQkAggregateModelSelector } from "./ArtQkAggregateModel.base"

/**
 * ArtQkAggregateModel
 *
 * aggregated selection of "art_qk"
 */
export const ArtQkAggregateModel = ArtQkAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
