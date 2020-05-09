import { herkunft_revModelBase } from "./herkunft_revModel.base"


/* A graphql query fragment builders for herkunft_revModel */
export { selectFromherkunft_rev, herkunft_revModelPrimitives, herkunft_revModelSelector } from "./herkunft_revModel.base"

/**
 * herkunft_revModel
 *
 * columns and relationships of "herkunft_rev"
 */
export const herkunft_revModel = herkunft_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
