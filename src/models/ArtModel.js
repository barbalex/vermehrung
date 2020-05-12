import { artModelBase } from "./artModel.base"


/* A graphql query fragment builders for artModel */
export { selectFromart, artModelPrimitives, artModelSelector } from "./artModel.base"

/**
 * artModel
 */
export const artModel = artModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
