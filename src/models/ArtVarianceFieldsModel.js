import { ArtVarianceFieldsModelBase } from "./ArtVarianceFieldsModel.base"


/* A graphql query fragment builders for ArtVarianceFieldsModel */
export { selectFromArtVarianceFields, artVarianceFieldsModelPrimitives, ArtVarianceFieldsModelSelector } from "./ArtVarianceFieldsModel.base"

/**
 * ArtVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const ArtVarianceFieldsModel = ArtVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
