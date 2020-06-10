import { gvModelBase } from "./gvModel.base"


/* A graphql query fragment builders for gvModel */
export { selectFromgv, gvModelPrimitives, gvModelSelector } from "./gvModel.base"

/**
 * gvModel
 */
export const gvModel = gvModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
