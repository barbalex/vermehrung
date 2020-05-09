import { ArtStddevFieldsModelBase } from "./ArtStddevFieldsModel.base"


/* A graphql query fragment builders for ArtStddevFieldsModel */
export { selectFromArtStddevFields, artStddevFieldsModelPrimitives, ArtStddevFieldsModelSelector } from "./ArtStddevFieldsModel.base"

/**
 * ArtStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const ArtStddevFieldsModel = ArtStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
