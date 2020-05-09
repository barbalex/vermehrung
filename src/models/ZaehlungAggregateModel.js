import { ZaehlungAggregateModelBase } from "./ZaehlungAggregateModel.base"


/* A graphql query fragment builders for ZaehlungAggregateModel */
export { selectFromZaehlungAggregate, zaehlungAggregateModelPrimitives, ZaehlungAggregateModelSelector } from "./ZaehlungAggregateModel.base"

/**
 * ZaehlungAggregateModel
 *
 * aggregated selection of "zaehlung"
 */
export const ZaehlungAggregateModel = ZaehlungAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
