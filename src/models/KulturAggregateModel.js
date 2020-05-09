import { KulturAggregateModelBase } from "./KulturAggregateModel.base"


/* A graphql query fragment builders for KulturAggregateModel */
export { selectFromKulturAggregate, kulturAggregateModelPrimitives, KulturAggregateModelSelector } from "./KulturAggregateModel.base"

/**
 * KulturAggregateModel
 *
 * aggregated selection of "kultur"
 */
export const KulturAggregateModel = KulturAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
