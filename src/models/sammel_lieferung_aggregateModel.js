import { sammel_lieferung_aggregateModelBase } from "./sammel_lieferung_aggregateModel.base"


/* A graphql query fragment builders for sammel_lieferung_aggregateModel */
export { selectFromsammel_lieferung_aggregate, sammel_lieferung_aggregateModelPrimitives, sammel_lieferung_aggregateModelSelector } from "./sammel_lieferung_aggregateModel.base"

/**
 * sammel_lieferung_aggregateModel
 *
 * aggregated selection of "sammel_lieferung"
 */
export const sammel_lieferung_aggregateModel = sammel_lieferung_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
