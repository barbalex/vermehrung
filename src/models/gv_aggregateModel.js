import { gv_aggregateModelBase } from "./gv_aggregateModel.base"


/* A graphql query fragment builders for gv_aggregateModel */
export { selectFromgv_aggregate, gv_aggregateModelPrimitives, gv_aggregateModelSelector } from "./gv_aggregateModel.base"

/**
 * gv_aggregateModel
 */
export const gv_aggregateModel = gv_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
