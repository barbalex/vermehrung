import { ArtRevModelBase } from "./ArtRevModel.base"


/* A graphql query fragment builders for ArtRevModel */
export { selectFromArtRev, artRevModelPrimitives, ArtRevModelSelector } from "./ArtRevModel.base"

/**
 * ArtRevModel
 *
 * columns and relationships of "art_rev"
 */
export const ArtRevModel = ArtRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
