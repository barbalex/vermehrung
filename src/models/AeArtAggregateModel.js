import { AeArtAggregateModelBase } from "./AeArtAggregateModel.base"


/* A graphql query fragment builders for AeArtAggregateModel */
export { selectFromAeArtAggregate, aeArtAggregateModelPrimitives, AeArtAggregateModelSelector } from "./AeArtAggregateModel.base"

/**
 * AeArtAggregateModel
 *
 * aggregated selection of "ae_art"
 */
export const AeArtAggregateModel = AeArtAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
