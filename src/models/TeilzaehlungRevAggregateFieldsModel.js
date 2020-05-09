import { TeilzaehlungRevAggregateFieldsModelBase } from "./TeilzaehlungRevAggregateFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevAggregateFieldsModel */
export { selectFromTeilzaehlungRevAggregateFields, teilzaehlungRevAggregateFieldsModelPrimitives, TeilzaehlungRevAggregateFieldsModelSelector } from "./TeilzaehlungRevAggregateFieldsModel.base"

/**
 * TeilzaehlungRevAggregateFieldsModel
 *
 * aggregate fields of "teilzaehlung_rev"
 */
export const TeilzaehlungRevAggregateFieldsModel = TeilzaehlungRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
