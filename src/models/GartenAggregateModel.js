import { GartenAggregateModelBase } from "./GartenAggregateModel.base"


/* A graphql query fragment builders for GartenAggregateModel */
export { selectFromGartenAggregate, gartenAggregateModelPrimitives, GartenAggregateModelSelector } from "./GartenAggregateModel.base"

/**
 * GartenAggregateModel
 *
 * aggregated selection of "garten"
 */
export const GartenAggregateModel = GartenAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
