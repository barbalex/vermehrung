import { ArtQkStddevPopFieldsModelBase } from "./ArtQkStddevPopFieldsModel.base"


/* A graphql query fragment builders for ArtQkStddevPopFieldsModel */
export { selectFromArtQkStddevPopFields, artQkStddevPopFieldsModelPrimitives, ArtQkStddevPopFieldsModelSelector } from "./ArtQkStddevPopFieldsModel.base"

/**
 * ArtQkStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const ArtQkStddevPopFieldsModel = ArtQkStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
