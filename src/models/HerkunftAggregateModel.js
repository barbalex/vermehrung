import { HerkunftAggregateModelBase } from "./HerkunftAggregateModel.base"


/* A graphql query fragment builders for HerkunftAggregateModel */
export { selectFromHerkunftAggregate, herkunftAggregateModelPrimitives, HerkunftAggregateModelSelector } from "./HerkunftAggregateModel.base"

/**
 * HerkunftAggregateModel
 *
 * aggregated selection of "herkunft"
 */
export const HerkunftAggregateModel = HerkunftAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
