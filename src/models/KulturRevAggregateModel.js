import { KulturRevAggregateModelBase } from "./KulturRevAggregateModel.base"


/* A graphql query fragment builders for KulturRevAggregateModel */
export { selectFromKulturRevAggregate, kulturRevAggregateModelPrimitives, KulturRevAggregateModelSelector } from "./KulturRevAggregateModel.base"

/**
 * KulturRevAggregateModel
 *
 * aggregated selection of "kultur_rev"
 */
export const KulturRevAggregateModel = KulturRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
