import { teilzaehlung_rev_aggregateModelBase } from "./teilzaehlung_rev_aggregateModel.base"


/* A graphql query fragment builders for teilzaehlung_rev_aggregateModel */
export { selectFromteilzaehlung_rev_aggregate, teilzaehlung_rev_aggregateModelPrimitives, teilzaehlung_rev_aggregateModelSelector } from "./teilzaehlung_rev_aggregateModel.base"

/**
 * teilzaehlung_rev_aggregateModel
 *
 * aggregated selection of "teilzaehlung_rev"
 */
export const teilzaehlung_rev_aggregateModel = teilzaehlung_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
