import { TeilzaehlungAggregateModelBase } from "./TeilzaehlungAggregateModel.base"


/* A graphql query fragment builders for TeilzaehlungAggregateModel */
export { selectFromTeilzaehlungAggregate, teilzaehlungAggregateModelPrimitives, TeilzaehlungAggregateModelSelector } from "./TeilzaehlungAggregateModel.base"

/**
 * TeilzaehlungAggregateModel
 *
 * aggregated selection of "teilzaehlung"
 */
export const TeilzaehlungAggregateModel = TeilzaehlungAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
