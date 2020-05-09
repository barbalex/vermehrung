import { garten_file_aggregateModelBase } from "./garten_file_aggregateModel.base"


/* A graphql query fragment builders for garten_file_aggregateModel */
export { selectFromgarten_file_aggregate, garten_file_aggregateModelPrimitives, garten_file_aggregateModelSelector } from "./garten_file_aggregateModel.base"

/**
 * garten_file_aggregateModel
 *
 * aggregated selection of "garten_file"
 */
export const garten_file_aggregateModel = garten_file_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
