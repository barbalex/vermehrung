import { avModelBase } from "./avModel.base"


/* A graphql query fragment builders for avModel */
export { selectFromav, avModelPrimitives, avModelSelector } from "./avModel.base"

/**
 * avModel
 */
export const avModel = avModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
