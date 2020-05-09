import { ArtRevSumFieldsModelBase } from "./ArtRevSumFieldsModel.base"


/* A graphql query fragment builders for ArtRevSumFieldsModel */
export { selectFromArtRevSumFields, artRevSumFieldsModelPrimitives, ArtRevSumFieldsModelSelector } from "./ArtRevSumFieldsModel.base"

/**
 * ArtRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const ArtRevSumFieldsModel = ArtRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
