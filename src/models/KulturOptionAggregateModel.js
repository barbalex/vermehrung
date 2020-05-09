import { KulturOptionAggregateModelBase } from "./KulturOptionAggregateModel.base"


/* A graphql query fragment builders for KulturOptionAggregateModel */
export { selectFromKulturOptionAggregate, kulturOptionAggregateModelPrimitives, KulturOptionAggregateModelSelector } from "./KulturOptionAggregateModel.base"

/**
 * KulturOptionAggregateModel
 *
 * aggregated selection of "kultur_option"
 */
export const KulturOptionAggregateModel = KulturOptionAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
