import { ArtRevStddevFieldsModelBase } from "./ArtRevStddevFieldsModel.base"


/* A graphql query fragment builders for ArtRevStddevFieldsModel */
export { selectFromArtRevStddevFields, artRevStddevFieldsModelPrimitives, ArtRevStddevFieldsModelSelector } from "./ArtRevStddevFieldsModel.base"

/**
 * ArtRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const ArtRevStddevFieldsModel = ArtRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
