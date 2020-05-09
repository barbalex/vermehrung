import { kultur_qk_aggregateModelBase } from "./kultur_qk_aggregateModel.base"


/* A graphql query fragment builders for kultur_qk_aggregateModel */
export { selectFromkultur_qk_aggregate, kultur_qk_aggregateModelPrimitives, kultur_qk_aggregateModelSelector } from "./kultur_qk_aggregateModel.base"

/**
 * kultur_qk_aggregateModel
 *
 * aggregated selection of "kultur_qk"
 */
export const kultur_qk_aggregateModel = kultur_qk_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
