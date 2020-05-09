import { AvArtModelBase } from "./AvArtModel.base"


/* A graphql query fragment builders for AvArtModel */
export { selectFromAvArt, avArtModelPrimitives, AvArtModelSelector } from "./AvArtModel.base"

/**
 * AvArtModel
 *
 * columns and relationships of "av_art"
 */
export const AvArtModel = AvArtModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
