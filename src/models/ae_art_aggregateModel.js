import { ae_art_aggregateModelBase } from "./ae_art_aggregateModel.base"


/* A graphql query fragment builders for ae_art_aggregateModel */
export { selectFromae_art_aggregate, ae_art_aggregateModelPrimitives, ae_art_aggregateModelSelector } from "./ae_art_aggregateModel.base"

/**
 * ae_art_aggregateModel
 *
 * aggregated selection of "ae_art"
 */
export const ae_art_aggregateModel = ae_art_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
