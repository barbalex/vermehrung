import { gv_rev_aggregateModelBase } from "./gv_rev_aggregateModel.base"


/* A graphql query fragment builders for gv_rev_aggregateModel */
export { selectFromgv_rev_aggregate, gv_rev_aggregateModelPrimitives, gv_rev_aggregateModelSelector } from "./gv_rev_aggregateModel.base"

/**
 * gv_rev_aggregateModel
 */
export const gv_rev_aggregateModel = gv_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
