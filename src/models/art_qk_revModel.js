import { art_qk_revModelBase } from "./art_qk_revModel.base"


/* A graphql query fragment builders for art_qk_revModel */
export { selectFromart_qk_rev, art_qk_revModelPrimitives, art_qk_revModelSelector } from "./art_qk_revModel.base"

/**
 * art_qk_revModel
 */
export const art_qk_revModel = art_qk_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
