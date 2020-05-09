import { ArtSumsStddevFieldsModelBase } from "./ArtSumsStddevFieldsModel.base"


/* A graphql query fragment builders for ArtSumsStddevFieldsModel */
export { selectFromArtSumsStddevFields, artSumsStddevFieldsModelPrimitives, ArtSumsStddevFieldsModelSelector } from "./ArtSumsStddevFieldsModel.base"

/**
 * ArtSumsStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const ArtSumsStddevFieldsModel = ArtSumsStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
