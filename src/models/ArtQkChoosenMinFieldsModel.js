import { ArtQkChoosenMinFieldsModelBase } from "./ArtQkChoosenMinFieldsModel.base"


/* A graphql query fragment builders for ArtQkChoosenMinFieldsModel */
export { selectFromArtQkChoosenMinFields, artQkChoosenMinFieldsModelPrimitives, ArtQkChoosenMinFieldsModelSelector } from "./ArtQkChoosenMinFieldsModel.base"

/**
 * ArtQkChoosenMinFieldsModel
 *
 * aggregate min on columns
 */
export const ArtQkChoosenMinFieldsModel = ArtQkChoosenMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
