import { ArtQkStddevFieldsModelBase } from "./ArtQkStddevFieldsModel.base"


/* A graphql query fragment builders for ArtQkStddevFieldsModel */
export { selectFromArtQkStddevFields, artQkStddevFieldsModelPrimitives, ArtQkStddevFieldsModelSelector } from "./ArtQkStddevFieldsModel.base"

/**
 * ArtQkStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const ArtQkStddevFieldsModel = ArtQkStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
