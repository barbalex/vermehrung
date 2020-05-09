import { ArtAggregateFieldsModelBase } from "./ArtAggregateFieldsModel.base"


/* A graphql query fragment builders for ArtAggregateFieldsModel */
export { selectFromArtAggregateFields, artAggregateFieldsModelPrimitives, ArtAggregateFieldsModelSelector } from "./ArtAggregateFieldsModel.base"

/**
 * ArtAggregateFieldsModel
 *
 * aggregate fields of "art"
 */
export const ArtAggregateFieldsModel = ArtAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
