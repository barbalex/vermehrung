import { ArtRevAggregateFieldsModelBase } from "./ArtRevAggregateFieldsModel.base"


/* A graphql query fragment builders for ArtRevAggregateFieldsModel */
export { selectFromArtRevAggregateFields, artRevAggregateFieldsModelPrimitives, ArtRevAggregateFieldsModelSelector } from "./ArtRevAggregateFieldsModel.base"

/**
 * ArtRevAggregateFieldsModel
 *
 * aggregate fields of "art_rev"
 */
export const ArtRevAggregateFieldsModel = ArtRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
