import { ArtSumsMinFieldsModelBase } from "./ArtSumsMinFieldsModel.base"


/* A graphql query fragment builders for ArtSumsMinFieldsModel */
export { selectFromArtSumsMinFields, artSumsMinFieldsModelPrimitives, ArtSumsMinFieldsModelSelector } from "./ArtSumsMinFieldsModel.base"

/**
 * ArtSumsMinFieldsModel
 *
 * aggregate min on columns
 */
export const ArtSumsMinFieldsModel = ArtSumsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
