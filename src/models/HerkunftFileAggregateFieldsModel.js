import { HerkunftFileAggregateFieldsModelBase } from "./HerkunftFileAggregateFieldsModel.base"


/* A graphql query fragment builders for HerkunftFileAggregateFieldsModel */
export { selectFromHerkunftFileAggregateFields, herkunftFileAggregateFieldsModelPrimitives, HerkunftFileAggregateFieldsModelSelector } from "./HerkunftFileAggregateFieldsModel.base"

/**
 * HerkunftFileAggregateFieldsModel
 *
 * aggregate fields of "herkunft_file"
 */
export const HerkunftFileAggregateFieldsModel = HerkunftFileAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
