import { ArtFileMinFieldsModelBase } from "./ArtFileMinFieldsModel.base"


/* A graphql query fragment builders for ArtFileMinFieldsModel */
export { selectFromArtFileMinFields, artFileMinFieldsModelPrimitives, ArtFileMinFieldsModelSelector } from "./ArtFileMinFieldsModel.base"

/**
 * ArtFileMinFieldsModel
 *
 * aggregate min on columns
 */
export const ArtFileMinFieldsModel = ArtFileMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
