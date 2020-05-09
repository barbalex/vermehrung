import { ArtQkVarianceFieldsModelBase } from "./ArtQkVarianceFieldsModel.base"


/* A graphql query fragment builders for ArtQkVarianceFieldsModel */
export { selectFromArtQkVarianceFields, artQkVarianceFieldsModelPrimitives, ArtQkVarianceFieldsModelSelector } from "./ArtQkVarianceFieldsModel.base"

/**
 * ArtQkVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const ArtQkVarianceFieldsModel = ArtQkVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
