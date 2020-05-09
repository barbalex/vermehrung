import { HerkunftRevAggregateFieldsModelBase } from "./HerkunftRevAggregateFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevAggregateFieldsModel */
export { selectFromHerkunftRevAggregateFields, herkunftRevAggregateFieldsModelPrimitives, HerkunftRevAggregateFieldsModelSelector } from "./HerkunftRevAggregateFieldsModel.base"

/**
 * HerkunftRevAggregateFieldsModel
 *
 * aggregate fields of "herkunft_rev"
 */
export const HerkunftRevAggregateFieldsModel = HerkunftRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
