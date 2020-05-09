import { ArtRevVarianceFieldsModelBase } from "./ArtRevVarianceFieldsModel.base"


/* A graphql query fragment builders for ArtRevVarianceFieldsModel */
export { selectFromArtRevVarianceFields, artRevVarianceFieldsModelPrimitives, ArtRevVarianceFieldsModelSelector } from "./ArtRevVarianceFieldsModel.base"

/**
 * ArtRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const ArtRevVarianceFieldsModel = ArtRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
