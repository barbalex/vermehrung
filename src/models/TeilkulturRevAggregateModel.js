import { TeilkulturRevAggregateModelBase } from "./TeilkulturRevAggregateModel.base"


/* A graphql query fragment builders for TeilkulturRevAggregateModel */
export { selectFromTeilkulturRevAggregate, teilkulturRevAggregateModelPrimitives, TeilkulturRevAggregateModelSelector } from "./TeilkulturRevAggregateModel.base"

/**
 * TeilkulturRevAggregateModel
 *
 * aggregated selection of "teilkultur_rev"
 */
export const TeilkulturRevAggregateModel = TeilkulturRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
