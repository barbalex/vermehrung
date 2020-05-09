import { herkunft_sumsModelBase } from "./herkunft_sumsModel.base"


/* A graphql query fragment builders for herkunft_sumsModel */
export { selectFromherkunft_sums, herkunft_sumsModelPrimitives, herkunft_sumsModelSelector } from "./herkunft_sumsModel.base"

/**
 * herkunft_sumsModel
 *
 * columns and relationships of "herkunft_sums"
 */
export const herkunft_sumsModel = herkunft_sumsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
