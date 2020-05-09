import { ArtFileModelBase } from "./ArtFileModel.base"


/* A graphql query fragment builders for ArtFileModel */
export { selectFromArtFile, artFileModelPrimitives, ArtFileModelSelector } from "./ArtFileModel.base"

/**
 * ArtFileModel
 *
 * columns and relationships of "art_file"
 */
export const ArtFileModel = ArtFileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
