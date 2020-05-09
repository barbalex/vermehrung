import { ArtMinFieldsModelBase } from "./ArtMinFieldsModel.base"


/* A graphql query fragment builders for ArtMinFieldsModel */
export { selectFromArtMinFields, artMinFieldsModelPrimitives, ArtMinFieldsModelSelector } from "./ArtMinFieldsModel.base"

/**
 * ArtMinFieldsModel
 *
 * aggregate min on columns
 */
export const ArtMinFieldsModel = ArtMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
