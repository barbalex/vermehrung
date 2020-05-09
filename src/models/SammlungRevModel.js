import { SammlungRevModelBase } from "./SammlungRevModel.base"


/* A graphql query fragment builders for SammlungRevModel */
export { selectFromSammlungRev, sammlungRevModelPrimitives, SammlungRevModelSelector } from "./SammlungRevModel.base"

/**
 * SammlungRevModel
 *
 * columns and relationships of "sammlung_rev"
 */
export const SammlungRevModel = SammlungRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
