import { kultur_option_rev_aggregateModelBase } from "./kultur_option_rev_aggregateModel.base"


/* A graphql query fragment builders for kultur_option_rev_aggregateModel */
export { selectFromkultur_option_rev_aggregate, kultur_option_rev_aggregateModelPrimitives, kultur_option_rev_aggregateModelSelector } from "./kultur_option_rev_aggregateModel.base"

/**
 * kultur_option_rev_aggregateModel
 *
 * aggregated selection of "kultur_option_rev"
 */
export const kultur_option_rev_aggregateModel = kultur_option_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
