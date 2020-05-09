import { HerkunftModelBase } from "./HerkunftModel.base"


/* A graphql query fragment builders for HerkunftModel */
export { selectFromHerkunft, herkunftModelPrimitives, HerkunftModelSelector } from "./HerkunftModel.base"

/**
 * HerkunftModel
 *
 * columns and relationships of "herkunft"
 */
export const HerkunftModel = HerkunftModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
