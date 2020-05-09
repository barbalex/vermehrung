import { ArtRevStddevSampFieldsModelBase } from "./ArtRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for ArtRevStddevSampFieldsModel */
export { selectFromArtRevStddevSampFields, artRevStddevSampFieldsModelPrimitives, ArtRevStddevSampFieldsModelSelector } from "./ArtRevStddevSampFieldsModel.base"

/**
 * ArtRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const ArtRevStddevSampFieldsModel = ArtRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
