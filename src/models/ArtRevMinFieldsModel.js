import { ArtRevMinFieldsModelBase } from "./ArtRevMinFieldsModel.base"


/* A graphql query fragment builders for ArtRevMinFieldsModel */
export { selectFromArtRevMinFields, artRevMinFieldsModelPrimitives, ArtRevMinFieldsModelSelector } from "./ArtRevMinFieldsModel.base"

/**
 * ArtRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const ArtRevMinFieldsModel = ArtRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
