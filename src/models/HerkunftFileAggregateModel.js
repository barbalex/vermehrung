import { HerkunftFileAggregateModelBase } from "./HerkunftFileAggregateModel.base"


/* A graphql query fragment builders for HerkunftFileAggregateModel */
export { selectFromHerkunftFileAggregate, herkunftFileAggregateModelPrimitives, HerkunftFileAggregateModelSelector } from "./HerkunftFileAggregateModel.base"

/**
 * HerkunftFileAggregateModel
 *
 * aggregated selection of "herkunft_file"
 */
export const HerkunftFileAggregateModel = HerkunftFileAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
