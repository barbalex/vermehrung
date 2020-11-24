import { gartenModelBase } from "./gartenModel.base"


/* A graphql query fragment builders for gartenModel */
export { selectFromgarten, gartenModelPrimitives, gartenModelSelector } from "./gartenModel.base"

/**
 * gartenModel
 */
export const gartenModel = gartenModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
