import { ArtQkAggregateFieldsModelBase } from "./ArtQkAggregateFieldsModel.base"


/* A graphql query fragment builders for ArtQkAggregateFieldsModel */
export { selectFromArtQkAggregateFields, artQkAggregateFieldsModelPrimitives, ArtQkAggregateFieldsModelSelector } from "./ArtQkAggregateFieldsModel.base"

/**
 * ArtQkAggregateFieldsModel
 *
 * aggregate fields of "art_qk"
 */
export const ArtQkAggregateFieldsModel = ArtQkAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
