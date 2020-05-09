import { ArtQkStddevSampFieldsModelBase } from "./ArtQkStddevSampFieldsModel.base"


/* A graphql query fragment builders for ArtQkStddevSampFieldsModel */
export { selectFromArtQkStddevSampFields, artQkStddevSampFieldsModelPrimitives, ArtQkStddevSampFieldsModelSelector } from "./ArtQkStddevSampFieldsModel.base"

/**
 * ArtQkStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const ArtQkStddevSampFieldsModel = ArtQkStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
