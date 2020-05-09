import { lieferung_file_aggregateModelBase } from "./lieferung_file_aggregateModel.base"


/* A graphql query fragment builders for lieferung_file_aggregateModel */
export { selectFromlieferung_file_aggregate, lieferung_file_aggregateModelPrimitives, lieferung_file_aggregateModelSelector } from "./lieferung_file_aggregateModel.base"

/**
 * lieferung_file_aggregateModel
 *
 * aggregated selection of "lieferung_file"
 */
export const lieferung_file_aggregateModel = lieferung_file_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
