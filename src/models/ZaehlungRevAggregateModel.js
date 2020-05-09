import { ZaehlungRevAggregateModelBase } from "./ZaehlungRevAggregateModel.base"


/* A graphql query fragment builders for ZaehlungRevAggregateModel */
export { selectFromZaehlungRevAggregate, zaehlungRevAggregateModelPrimitives, ZaehlungRevAggregateModelSelector } from "./ZaehlungRevAggregateModel.base"

/**
 * ZaehlungRevAggregateModel
 *
 * aggregated selection of "zaehlung_rev"
 */
export const ZaehlungRevAggregateModel = ZaehlungRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
