import { ArtQkAvgFieldsModelBase } from "./ArtQkAvgFieldsModel.base"


/* A graphql query fragment builders for ArtQkAvgFieldsModel */
export { selectFromArtQkAvgFields, artQkAvgFieldsModelPrimitives, ArtQkAvgFieldsModelSelector } from "./ArtQkAvgFieldsModel.base"

/**
 * ArtQkAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const ArtQkAvgFieldsModel = ArtQkAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
