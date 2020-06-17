import { av_revModelBase } from "./av_revModel.base"


/* A graphql query fragment builders for av_revModel */
export { selectFromav_rev, av_revModelPrimitives, av_revModelSelector } from "./av_revModel.base"

/**
 * av_revModel
 */
export const av_revModel = av_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
