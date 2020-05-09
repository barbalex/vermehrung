import { AvArtAggregateFieldsModelBase } from "./AvArtAggregateFieldsModel.base"


/* A graphql query fragment builders for AvArtAggregateFieldsModel */
export { selectFromAvArtAggregateFields, avArtAggregateFieldsModelPrimitives, AvArtAggregateFieldsModelSelector } from "./AvArtAggregateFieldsModel.base"

/**
 * AvArtAggregateFieldsModel
 *
 * aggregate fields of "av_art"
 */
export const AvArtAggregateFieldsModel = AvArtAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
