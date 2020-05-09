import { ArtRevAvgFieldsModelBase } from "./ArtRevAvgFieldsModel.base"


/* A graphql query fragment builders for ArtRevAvgFieldsModel */
export { selectFromArtRevAvgFields, artRevAvgFieldsModelPrimitives, ArtRevAvgFieldsModelSelector } from "./ArtRevAvgFieldsModel.base"

/**
 * ArtRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const ArtRevAvgFieldsModel = ArtRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
