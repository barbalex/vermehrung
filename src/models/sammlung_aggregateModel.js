import { sammlung_aggregateModelBase } from "./sammlung_aggregateModel.base"


/* A graphql query fragment builders for sammlung_aggregateModel */
export { selectFromsammlung_aggregate, sammlung_aggregateModelPrimitives, sammlung_aggregateModelSelector } from "./sammlung_aggregateModel.base"

/**
 * sammlung_aggregateModel
 *
 * aggregated selection of "sammlung"
 */
export const sammlung_aggregateModel = sammlung_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
