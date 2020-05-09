import { ZaehlungRevAggregateFieldsModelBase } from "./ZaehlungRevAggregateFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevAggregateFieldsModel */
export { selectFromZaehlungRevAggregateFields, zaehlungRevAggregateFieldsModelPrimitives, ZaehlungRevAggregateFieldsModelSelector } from "./ZaehlungRevAggregateFieldsModel.base"

/**
 * ZaehlungRevAggregateFieldsModel
 *
 * aggregate fields of "zaehlung_rev"
 */
export const ZaehlungRevAggregateFieldsModel = ZaehlungRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
