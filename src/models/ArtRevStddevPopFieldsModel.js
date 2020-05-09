import { ArtRevStddevPopFieldsModelBase } from "./ArtRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for ArtRevStddevPopFieldsModel */
export { selectFromArtRevStddevPopFields, artRevStddevPopFieldsModelPrimitives, ArtRevStddevPopFieldsModelSelector } from "./ArtRevStddevPopFieldsModel.base"

/**
 * ArtRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const ArtRevStddevPopFieldsModel = ArtRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
