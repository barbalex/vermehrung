import { ArtMaxFieldsModelBase } from "./ArtMaxFieldsModel.base"


/* A graphql query fragment builders for ArtMaxFieldsModel */
export { selectFromArtMaxFields, artMaxFieldsModelPrimitives, ArtMaxFieldsModelSelector } from "./ArtMaxFieldsModel.base"

/**
 * ArtMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ArtMaxFieldsModel = ArtMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
