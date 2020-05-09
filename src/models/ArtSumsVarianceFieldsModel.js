import { ArtSumsVarianceFieldsModelBase } from "./ArtSumsVarianceFieldsModel.base"


/* A graphql query fragment builders for ArtSumsVarianceFieldsModel */
export { selectFromArtSumsVarianceFields, artSumsVarianceFieldsModelPrimitives, ArtSumsVarianceFieldsModelSelector } from "./ArtSumsVarianceFieldsModel.base"

/**
 * ArtSumsVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const ArtSumsVarianceFieldsModel = ArtSumsVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
