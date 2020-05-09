import { kulturModelBase } from "./kulturModel.base"


/* A graphql query fragment builders for kulturModel */
export { selectFromkultur, kulturModelPrimitives, kulturModelSelector } from "./kulturModel.base"

/**
 * kulturModel
 *
 * columns and relationships of "kultur"
 */
export const kulturModel = kulturModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
