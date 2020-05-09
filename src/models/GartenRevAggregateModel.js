import { GartenRevAggregateModelBase } from "./GartenRevAggregateModel.base"


/* A graphql query fragment builders for GartenRevAggregateModel */
export { selectFromGartenRevAggregate, gartenRevAggregateModelPrimitives, GartenRevAggregateModelSelector } from "./GartenRevAggregateModel.base"

/**
 * GartenRevAggregateModel
 *
 * aggregated selection of "garten_rev"
 */
export const GartenRevAggregateModel = GartenRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
