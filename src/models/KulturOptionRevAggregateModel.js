import { KulturOptionRevAggregateModelBase } from "./KulturOptionRevAggregateModel.base"


/* A graphql query fragment builders for KulturOptionRevAggregateModel */
export { selectFromKulturOptionRevAggregate, kulturOptionRevAggregateModelPrimitives, KulturOptionRevAggregateModelSelector } from "./KulturOptionRevAggregateModel.base"

/**
 * KulturOptionRevAggregateModel
 *
 * aggregated selection of "kultur_option_rev"
 */
export const KulturOptionRevAggregateModel = KulturOptionRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
