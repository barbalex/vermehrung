import { ArtAvgFieldsModelBase } from "./ArtAvgFieldsModel.base"


/* A graphql query fragment builders for ArtAvgFieldsModel */
export { selectFromArtAvgFields, artAvgFieldsModelPrimitives, ArtAvgFieldsModelSelector } from "./ArtAvgFieldsModel.base"

/**
 * ArtAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const ArtAvgFieldsModel = ArtAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
