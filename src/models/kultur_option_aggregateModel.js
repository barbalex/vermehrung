import { kultur_option_aggregateModelBase } from "./kultur_option_aggregateModel.base"


/* A graphql query fragment builders for kultur_option_aggregateModel */
export { selectFromkultur_option_aggregate, kultur_option_aggregateModelPrimitives, kultur_option_aggregateModelSelector } from "./kultur_option_aggregateModel.base"

/**
 * kultur_option_aggregateModel
 *
 * aggregated selection of "kultur_option"
 */
export const kultur_option_aggregateModel = kultur_option_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
