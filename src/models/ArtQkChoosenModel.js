import { ArtQkChoosenModelBase } from "./ArtQkChoosenModel.base"


/* A graphql query fragment builders for ArtQkChoosenModel */
export { selectFromArtQkChoosen, artQkChoosenModelPrimitives, ArtQkChoosenModelSelector } from "./ArtQkChoosenModel.base"

/**
 * ArtQkChoosenModel
 *
 * columns and relationships of "art_qk_choosen"
 */
export const ArtQkChoosenModel = ArtQkChoosenModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
