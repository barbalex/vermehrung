import { ArtSumsAvgFieldsModelBase } from "./ArtSumsAvgFieldsModel.base"


/* A graphql query fragment builders for ArtSumsAvgFieldsModel */
export { selectFromArtSumsAvgFields, artSumsAvgFieldsModelPrimitives, ArtSumsAvgFieldsModelSelector } from "./ArtSumsAvgFieldsModel.base"

/**
 * ArtSumsAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const ArtSumsAvgFieldsModel = ArtSumsAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
