import { ae_artModelBase } from "./ae_artModel.base"


/* A graphql query fragment builders for ae_artModel */
export { selectFromae_art, ae_artModelPrimitives, ae_artModelSelector } from "./ae_artModel.base"

/**
 * ae_artModel
 */
export const ae_artModel = ae_artModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
