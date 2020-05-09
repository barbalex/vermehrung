import { HerkunftSumsAggregateModelBase } from "./HerkunftSumsAggregateModel.base"


/* A graphql query fragment builders for HerkunftSumsAggregateModel */
export { selectFromHerkunftSumsAggregate, herkunftSumsAggregateModelPrimitives, HerkunftSumsAggregateModelSelector } from "./HerkunftSumsAggregateModel.base"

/**
 * HerkunftSumsAggregateModel
 *
 * aggregated selection of "herkunft_sums"
 */
export const HerkunftSumsAggregateModel = HerkunftSumsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
