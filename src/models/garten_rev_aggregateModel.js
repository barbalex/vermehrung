import { garten_rev_aggregateModelBase } from "./garten_rev_aggregateModel.base"


/* A graphql query fragment builders for garten_rev_aggregateModel */
export { selectFromgarten_rev_aggregate, garten_rev_aggregateModelPrimitives, garten_rev_aggregateModelSelector } from "./garten_rev_aggregateModel.base"

/**
 * garten_rev_aggregateModel
 *
 * aggregated selection of "garten_rev"
 */
export const garten_rev_aggregateModel = garten_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
