import { TeilkulturAggregateModelBase } from "./TeilkulturAggregateModel.base"


/* A graphql query fragment builders for TeilkulturAggregateModel */
export { selectFromTeilkulturAggregate, teilkulturAggregateModelPrimitives, TeilkulturAggregateModelSelector } from "./TeilkulturAggregateModel.base"

/**
 * TeilkulturAggregateModel
 *
 * aggregated selection of "teilkultur"
 */
export const TeilkulturAggregateModel = TeilkulturAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
