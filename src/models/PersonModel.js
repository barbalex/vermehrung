import { personModelBase } from "./personModel.base"


/* A graphql query fragment builders for personModel */
export { selectFromperson, personModelPrimitives, personModelSelector } from "./personModel.base"

/**
 * personModel
 */
export const personModel = personModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
