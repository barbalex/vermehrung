import { ArtModelBase } from "./ArtModel.base"


/* A graphql query fragment builders for ArtModel */
export { selectFromArt, artModelPrimitives, ArtModelSelector } from "./ArtModel.base"

/**
 * ArtModel
 *
 * columns and relationships of "art"
 */
export const ArtModel = ArtModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
