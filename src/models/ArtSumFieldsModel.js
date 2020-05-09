import { ArtSumFieldsModelBase } from "./ArtSumFieldsModel.base"


/* A graphql query fragment builders for ArtSumFieldsModel */
export { selectFromArtSumFields, artSumFieldsModelPrimitives, ArtSumFieldsModelSelector } from "./ArtSumFieldsModel.base"

/**
 * ArtSumFieldsModel
 *
 * aggregate sum on columns
 */
export const ArtSumFieldsModel = ArtSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
