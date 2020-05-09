import { ArtQkChoosenAggregateModelBase } from "./ArtQkChoosenAggregateModel.base"


/* A graphql query fragment builders for ArtQkChoosenAggregateModel */
export { selectFromArtQkChoosenAggregate, artQkChoosenAggregateModelPrimitives, ArtQkChoosenAggregateModelSelector } from "./ArtQkChoosenAggregateModel.base"

/**
 * ArtQkChoosenAggregateModel
 *
 * aggregated selection of "art_qk_choosen"
 */
export const ArtQkChoosenAggregateModel = ArtQkChoosenAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
