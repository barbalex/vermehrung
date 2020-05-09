import { ArtSumsMaxFieldsModelBase } from "./ArtSumsMaxFieldsModel.base"


/* A graphql query fragment builders for ArtSumsMaxFieldsModel */
export { selectFromArtSumsMaxFields, artSumsMaxFieldsModelPrimitives, ArtSumsMaxFieldsModelSelector } from "./ArtSumsMaxFieldsModel.base"

/**
 * ArtSumsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ArtSumsMaxFieldsModel = ArtSumsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
