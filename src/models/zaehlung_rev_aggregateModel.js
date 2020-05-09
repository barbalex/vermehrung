import { zaehlung_rev_aggregateModelBase } from "./zaehlung_rev_aggregateModel.base"


/* A graphql query fragment builders for zaehlung_rev_aggregateModel */
export { selectFromzaehlung_rev_aggregate, zaehlung_rev_aggregateModelPrimitives, zaehlung_rev_aggregateModelSelector } from "./zaehlung_rev_aggregateModel.base"

/**
 * zaehlung_rev_aggregateModel
 *
 * aggregated selection of "zaehlung_rev"
 */
export const zaehlung_rev_aggregateModel = zaehlung_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
