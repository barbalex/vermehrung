import { GartenTeilzaehlungSumsAggregateModelBase } from "./GartenTeilzaehlungSumsAggregateModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsAggregateModel */
export { selectFromGartenTeilzaehlungSumsAggregate, gartenTeilzaehlungSumsAggregateModelPrimitives, GartenTeilzaehlungSumsAggregateModelSelector } from "./GartenTeilzaehlungSumsAggregateModel.base"

/**
 * GartenTeilzaehlungSumsAggregateModel
 *
 * aggregated selection of "garten_teilzaehlung_sums"
 */
export const GartenTeilzaehlungSumsAggregateModel = GartenTeilzaehlungSumsAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
