import { zaehlung_aggregateModelBase } from "./zaehlung_aggregateModel.base"


/* A graphql query fragment builders for zaehlung_aggregateModel */
export { selectFromzaehlung_aggregate, zaehlung_aggregateModelPrimitives, zaehlung_aggregateModelSelector } from "./zaehlung_aggregateModel.base"

/**
 * zaehlung_aggregateModel
 *
 * aggregated selection of "zaehlung"
 */
export const zaehlung_aggregateModel = zaehlung_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
