import { ArtSumsModelBase } from "./ArtSumsModel.base"


/* A graphql query fragment builders for ArtSumsModel */
export { selectFromArtSums, artSumsModelPrimitives, ArtSumsModelSelector } from "./ArtSumsModel.base"

/**
 * ArtSumsModel
 *
 * columns and relationships of "art_sums"
 */
export const ArtSumsModel = ArtSumsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
