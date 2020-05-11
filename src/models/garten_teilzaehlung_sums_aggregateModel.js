import { garten_teilzaehlung_sums_aggregateModelBase } from "./garten_teilzaehlung_sums_aggregateModel.base"


/* A graphql query fragment builders for garten_teilzaehlung_sums_aggregateModel */
export { selectFromgarten_teilzaehlung_sums_aggregate, garten_teilzaehlung_sums_aggregateModelPrimitives, garten_teilzaehlung_sums_aggregateModelSelector } from "./garten_teilzaehlung_sums_aggregateModel.base"

/**
 * garten_teilzaehlung_sums_aggregateModel
 *
 * aggregated selection of "garten_teilzaehlung_sums"
 */
export const garten_teilzaehlung_sums_aggregateModel = garten_teilzaehlung_sums_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
