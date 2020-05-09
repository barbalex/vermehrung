import { SammlungFileAggregateModelBase } from "./SammlungFileAggregateModel.base"


/* A graphql query fragment builders for SammlungFileAggregateModel */
export { selectFromSammlungFileAggregate, sammlungFileAggregateModelPrimitives, SammlungFileAggregateModelSelector } from "./SammlungFileAggregateModel.base"

/**
 * SammlungFileAggregateModel
 *
 * aggregated selection of "sammlung_file"
 */
export const SammlungFileAggregateModel = SammlungFileAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
