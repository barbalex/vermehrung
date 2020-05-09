import { TeilzaehlungAggregateFieldsModelBase } from "./TeilzaehlungAggregateFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungAggregateFieldsModel */
export { selectFromTeilzaehlungAggregateFields, teilzaehlungAggregateFieldsModelPrimitives, TeilzaehlungAggregateFieldsModelSelector } from "./TeilzaehlungAggregateFieldsModel.base"

/**
 * TeilzaehlungAggregateFieldsModel
 *
 * aggregate fields of "teilzaehlung"
 */
export const TeilzaehlungAggregateFieldsModel = TeilzaehlungAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
