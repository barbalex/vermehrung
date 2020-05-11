import { av_artModelBase } from "./av_artModel.base"


/* A graphql query fragment builders for av_artModel */
export { selectFromav_art, av_artModelPrimitives, av_artModelSelector } from "./av_artModel.base"

/**
 * av_artModel
 *
 * columns and relationships of "av_art"
 */
export const av_artModel = av_artModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
