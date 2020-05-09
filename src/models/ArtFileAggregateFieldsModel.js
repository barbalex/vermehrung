import { ArtFileAggregateFieldsModelBase } from "./ArtFileAggregateFieldsModel.base"


/* A graphql query fragment builders for ArtFileAggregateFieldsModel */
export { selectFromArtFileAggregateFields, artFileAggregateFieldsModelPrimitives, ArtFileAggregateFieldsModelSelector } from "./ArtFileAggregateFieldsModel.base"

/**
 * ArtFileAggregateFieldsModel
 *
 * aggregate fields of "art_file"
 */
export const ArtFileAggregateFieldsModel = ArtFileAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
