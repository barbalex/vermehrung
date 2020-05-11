import { garten_aggregateModelBase } from "./garten_aggregateModel.base"


/* A graphql query fragment builders for garten_aggregateModel */
export { selectFromgarten_aggregate, garten_aggregateModelPrimitives, garten_aggregateModelSelector } from "./garten_aggregateModel.base"

/**
 * garten_aggregateModel
 *
 * aggregated selection of "garten"
 */
export const garten_aggregateModel = garten_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
