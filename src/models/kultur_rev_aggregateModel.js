import { kultur_rev_aggregateModelBase } from "./kultur_rev_aggregateModel.base"


/* A graphql query fragment builders for kultur_rev_aggregateModel */
export { selectFromkultur_rev_aggregate, kultur_rev_aggregateModelPrimitives, kultur_rev_aggregateModelSelector } from "./kultur_rev_aggregateModel.base"

/**
 * kultur_rev_aggregateModel
 *
 * aggregated selection of "kultur_rev"
 */
export const kultur_rev_aggregateModel = kultur_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
