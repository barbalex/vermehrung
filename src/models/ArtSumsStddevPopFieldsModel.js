import { ArtSumsStddevPopFieldsModelBase } from "./ArtSumsStddevPopFieldsModel.base"


/* A graphql query fragment builders for ArtSumsStddevPopFieldsModel */
export { selectFromArtSumsStddevPopFields, artSumsStddevPopFieldsModelPrimitives, ArtSumsStddevPopFieldsModelSelector } from "./ArtSumsStddevPopFieldsModel.base"

/**
 * ArtSumsStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const ArtSumsStddevPopFieldsModel = ArtSumsStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
