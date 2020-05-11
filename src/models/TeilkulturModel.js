import { teilkulturModelBase } from "./teilkulturModel.base"


/* A graphql query fragment builders for teilkulturModel */
export { selectFromteilkultur, teilkulturModelPrimitives, teilkulturModelSelector } from "./teilkulturModel.base"

/**
 * teilkulturModel
 *
 * columns and relationships of "teilkultur"
 */
export const teilkulturModel = teilkulturModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
