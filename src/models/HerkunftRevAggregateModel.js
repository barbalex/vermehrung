import { HerkunftRevAggregateModelBase } from "./HerkunftRevAggregateModel.base"


/* A graphql query fragment builders for HerkunftRevAggregateModel */
export { selectFromHerkunftRevAggregate, herkunftRevAggregateModelPrimitives, HerkunftRevAggregateModelSelector } from "./HerkunftRevAggregateModel.base"

/**
 * HerkunftRevAggregateModel
 *
 * aggregated selection of "herkunft_rev"
 */
export const HerkunftRevAggregateModel = HerkunftRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
