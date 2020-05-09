import { HerkunftAggregateFieldsModelBase } from "./HerkunftAggregateFieldsModel.base"


/* A graphql query fragment builders for HerkunftAggregateFieldsModel */
export { selectFromHerkunftAggregateFields, herkunftAggregateFieldsModelPrimitives, HerkunftAggregateFieldsModelSelector } from "./HerkunftAggregateFieldsModel.base"

/**
 * HerkunftAggregateFieldsModel
 *
 * aggregate fields of "herkunft"
 */
export const HerkunftAggregateFieldsModel = HerkunftAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
