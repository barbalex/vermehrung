import { ArtSumsStddevSampFieldsModelBase } from "./ArtSumsStddevSampFieldsModel.base"


/* A graphql query fragment builders for ArtSumsStddevSampFieldsModel */
export { selectFromArtSumsStddevSampFields, artSumsStddevSampFieldsModelPrimitives, ArtSumsStddevSampFieldsModelSelector } from "./ArtSumsStddevSampFieldsModel.base"

/**
 * ArtSumsStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const ArtSumsStddevSampFieldsModel = ArtSumsStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
