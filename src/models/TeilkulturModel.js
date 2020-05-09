import { TeilkulturModelBase } from "./TeilkulturModel.base"


/* A graphql query fragment builders for TeilkulturModel */
export { selectFromTeilkultur, teilkulturModelPrimitives, TeilkulturModelSelector } from "./TeilkulturModel.base"

/**
 * TeilkulturModel
 *
 * columns and relationships of "teilkultur"
 */
export const TeilkulturModel = TeilkulturModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
