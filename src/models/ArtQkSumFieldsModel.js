import { ArtQkSumFieldsModelBase } from "./ArtQkSumFieldsModel.base"


/* A graphql query fragment builders for ArtQkSumFieldsModel */
export { selectFromArtQkSumFields, artQkSumFieldsModelPrimitives, ArtQkSumFieldsModelSelector } from "./ArtQkSumFieldsModel.base"

/**
 * ArtQkSumFieldsModel
 *
 * aggregate sum on columns
 */
export const ArtQkSumFieldsModel = ArtQkSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
