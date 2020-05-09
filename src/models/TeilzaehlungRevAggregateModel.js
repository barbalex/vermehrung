import { TeilzaehlungRevAggregateModelBase } from "./TeilzaehlungRevAggregateModel.base"


/* A graphql query fragment builders for TeilzaehlungRevAggregateModel */
export { selectFromTeilzaehlungRevAggregate, teilzaehlungRevAggregateModelPrimitives, TeilzaehlungRevAggregateModelSelector } from "./TeilzaehlungRevAggregateModel.base"

/**
 * TeilzaehlungRevAggregateModel
 *
 * aggregated selection of "teilzaehlung_rev"
 */
export const TeilzaehlungRevAggregateModel = TeilzaehlungRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
