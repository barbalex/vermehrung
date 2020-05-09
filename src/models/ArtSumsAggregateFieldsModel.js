import { ArtSumsAggregateFieldsModelBase } from "./ArtSumsAggregateFieldsModel.base"


/* A graphql query fragment builders for ArtSumsAggregateFieldsModel */
export { selectFromArtSumsAggregateFields, artSumsAggregateFieldsModelPrimitives, ArtSumsAggregateFieldsModelSelector } from "./ArtSumsAggregateFieldsModel.base"

/**
 * ArtSumsAggregateFieldsModel
 *
 * aggregate fields of "art_sums"
 */
export const ArtSumsAggregateFieldsModel = ArtSumsAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
