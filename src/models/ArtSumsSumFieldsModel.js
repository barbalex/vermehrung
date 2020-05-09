import { ArtSumsSumFieldsModelBase } from "./ArtSumsSumFieldsModel.base"


/* A graphql query fragment builders for ArtSumsSumFieldsModel */
export { selectFromArtSumsSumFields, artSumsSumFieldsModelPrimitives, ArtSumsSumFieldsModelSelector } from "./ArtSumsSumFieldsModel.base"

/**
 * ArtSumsSumFieldsModel
 *
 * aggregate sum on columns
 */
export const ArtSumsSumFieldsModel = ArtSumsSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
