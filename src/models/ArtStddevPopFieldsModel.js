import { ArtStddevPopFieldsModelBase } from "./ArtStddevPopFieldsModel.base"


/* A graphql query fragment builders for ArtStddevPopFieldsModel */
export { selectFromArtStddevPopFields, artStddevPopFieldsModelPrimitives, ArtStddevPopFieldsModelSelector } from "./ArtStddevPopFieldsModel.base"

/**
 * ArtStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const ArtStddevPopFieldsModel = ArtStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
