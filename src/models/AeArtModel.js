import { AeArtModelBase } from "./AeArtModel.base"


/* A graphql query fragment builders for AeArtModel */
export { selectFromAeArt, aeArtModelPrimitives, AeArtModelSelector } from "./AeArtModel.base"

/**
 * AeArtModel
 *
 * columns and relationships of "ae_art"
 */
export const AeArtModel = AeArtModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
