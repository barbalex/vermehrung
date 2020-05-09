import { ArtQkModelBase } from "./ArtQkModel.base"


/* A graphql query fragment builders for ArtQkModel */
export { selectFromArtQk, artQkModelPrimitives, ArtQkModelSelector } from "./ArtQkModel.base"

/**
 * ArtQkModel
 *
 * columns and relationships of "art_qk"
 */
export const ArtQkModel = ArtQkModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
