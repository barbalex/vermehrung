import { SammlungModelBase } from "./SammlungModel.base"


/* A graphql query fragment builders for SammlungModel */
export { selectFromSammlung, sammlungModelPrimitives, SammlungModelSelector } from "./SammlungModel.base"

/**
 * SammlungModel
 *
 * columns and relationships of "sammlung"
 */
export const SammlungModel = SammlungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
