import { sammel_lieferung_rev_aggregateModelBase } from "./sammel_lieferung_rev_aggregateModel.base"


/* A graphql query fragment builders for sammel_lieferung_rev_aggregateModel */
export { selectFromsammel_lieferung_rev_aggregate, sammel_lieferung_rev_aggregateModelPrimitives, sammel_lieferung_rev_aggregateModelSelector } from "./sammel_lieferung_rev_aggregateModel.base"

/**
 * sammel_lieferung_rev_aggregateModel
 *
 * aggregated selection of "sammel_lieferung_rev"
 */
export const sammel_lieferung_rev_aggregateModel = sammel_lieferung_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
