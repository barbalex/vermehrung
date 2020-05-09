import { kultur_aggregateModelBase } from "./kultur_aggregateModel.base"


/* A graphql query fragment builders for kultur_aggregateModel */
export { selectFromkultur_aggregate, kultur_aggregateModelPrimitives, kultur_aggregateModelSelector } from "./kultur_aggregateModel.base"

/**
 * kultur_aggregateModel
 *
 * aggregated selection of "kultur"
 */
export const kultur_aggregateModel = kultur_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
