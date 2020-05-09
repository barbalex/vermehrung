import { ZaehlungAggregateFieldsModelBase } from "./ZaehlungAggregateFieldsModel.base"


/* A graphql query fragment builders for ZaehlungAggregateFieldsModel */
export { selectFromZaehlungAggregateFields, zaehlungAggregateFieldsModelPrimitives, ZaehlungAggregateFieldsModelSelector } from "./ZaehlungAggregateFieldsModel.base"

/**
 * ZaehlungAggregateFieldsModel
 *
 * aggregate fields of "zaehlung"
 */
export const ZaehlungAggregateFieldsModel = ZaehlungAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
