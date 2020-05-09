import { ArtQkMinFieldsModelBase } from "./ArtQkMinFieldsModel.base"


/* A graphql query fragment builders for ArtQkMinFieldsModel */
export { selectFromArtQkMinFields, artQkMinFieldsModelPrimitives, ArtQkMinFieldsModelSelector } from "./ArtQkMinFieldsModel.base"

/**
 * ArtQkMinFieldsModel
 *
 * aggregate min on columns
 */
export const ArtQkMinFieldsModel = ArtQkMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
