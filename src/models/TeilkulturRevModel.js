import { TeilkulturRevModelBase } from "./TeilkulturRevModel.base"


/* A graphql query fragment builders for TeilkulturRevModel */
export { selectFromTeilkulturRev, teilkulturRevModelPrimitives, TeilkulturRevModelSelector } from "./TeilkulturRevModel.base"

/**
 * TeilkulturRevModel
 *
 * columns and relationships of "teilkultur_rev"
 */
export const TeilkulturRevModel = TeilkulturRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
