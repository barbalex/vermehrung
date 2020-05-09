import { SammlungRevAggregateModelBase } from "./SammlungRevAggregateModel.base"


/* A graphql query fragment builders for SammlungRevAggregateModel */
export { selectFromSammlungRevAggregate, sammlungRevAggregateModelPrimitives, SammlungRevAggregateModelSelector } from "./SammlungRevAggregateModel.base"

/**
 * SammlungRevAggregateModel
 *
 * aggregated selection of "sammlung_rev"
 */
export const SammlungRevAggregateModel = SammlungRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
