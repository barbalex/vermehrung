import { HerkunftSumsAggregateFieldsModelBase } from "./HerkunftSumsAggregateFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsAggregateFieldsModel */
export { selectFromHerkunftSumsAggregateFields, herkunftSumsAggregateFieldsModelPrimitives, HerkunftSumsAggregateFieldsModelSelector } from "./HerkunftSumsAggregateFieldsModel.base"

/**
 * HerkunftSumsAggregateFieldsModel
 *
 * aggregate fields of "herkunft_sums"
 */
export const HerkunftSumsAggregateFieldsModel = HerkunftSumsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
