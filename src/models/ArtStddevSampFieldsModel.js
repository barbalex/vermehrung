import { ArtStddevSampFieldsModelBase } from "./ArtStddevSampFieldsModel.base"


/* A graphql query fragment builders for ArtStddevSampFieldsModel */
export { selectFromArtStddevSampFields, artStddevSampFieldsModelPrimitives, ArtStddevSampFieldsModelSelector } from "./ArtStddevSampFieldsModel.base"

/**
 * ArtStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const ArtStddevSampFieldsModel = ArtStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
