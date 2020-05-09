import { GartenFileAggregateModelBase } from "./GartenFileAggregateModel.base"


/* A graphql query fragment builders for GartenFileAggregateModel */
export { selectFromGartenFileAggregate, gartenFileAggregateModelPrimitives, GartenFileAggregateModelSelector } from "./GartenFileAggregateModel.base"

/**
 * GartenFileAggregateModel
 *
 * aggregated selection of "garten_file"
 */
export const GartenFileAggregateModel = GartenFileAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
