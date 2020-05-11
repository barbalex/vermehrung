import { sammlungModelBase } from "./sammlungModel.base"


/* A graphql query fragment builders for sammlungModel */
export { selectFromsammlung, sammlungModelPrimitives, sammlungModelSelector } from "./sammlungModel.base"

/**
 * sammlungModel
 *
 * columns and relationships of "sammlung"
 */
export const sammlungModel = sammlungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
