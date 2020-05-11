import { sammlung_file_aggregateModelBase } from "./sammlung_file_aggregateModel.base"


/* A graphql query fragment builders for sammlung_file_aggregateModel */
export { selectFromsammlung_file_aggregate, sammlung_file_aggregateModelPrimitives, sammlung_file_aggregateModelSelector } from "./sammlung_file_aggregateModel.base"

/**
 * sammlung_file_aggregateModel
 *
 * aggregated selection of "sammlung_file"
 */
export const sammlung_file_aggregateModel = sammlung_file_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
