import { herkunftModelBase } from "./herkunftModel.base"


/* A graphql query fragment builders for herkunftModel */
export { selectFromherkunft, herkunftModelPrimitives, herkunftModelSelector } from "./herkunftModel.base"

/**
 * herkunftModel
 *
 * columns and relationships of "herkunft"
 */
export const herkunftModel = herkunftModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
