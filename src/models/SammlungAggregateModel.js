import { SammlungAggregateModelBase } from "./SammlungAggregateModel.base"


/* A graphql query fragment builders for SammlungAggregateModel */
export { selectFromSammlungAggregate, sammlungAggregateModelPrimitives, SammlungAggregateModelSelector } from "./SammlungAggregateModel.base"

/**
 * SammlungAggregateModel
 *
 * aggregated selection of "sammlung"
 */
export const SammlungAggregateModel = SammlungAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
