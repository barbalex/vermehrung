import { kultur_file_aggregateModelBase } from "./kultur_file_aggregateModel.base"


/* A graphql query fragment builders for kultur_file_aggregateModel */
export { selectFromkultur_file_aggregate, kultur_file_aggregateModelPrimitives, kultur_file_aggregateModelSelector } from "./kultur_file_aggregateModel.base"

/**
 * kultur_file_aggregateModel
 *
 * aggregated selection of "kultur_file"
 */
export const kultur_file_aggregateModel = kultur_file_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
