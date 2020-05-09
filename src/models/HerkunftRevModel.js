import { HerkunftRevModelBase } from "./HerkunftRevModel.base"


/* A graphql query fragment builders for HerkunftRevModel */
export { selectFromHerkunftRev, herkunftRevModelPrimitives, HerkunftRevModelSelector } from "./HerkunftRevModel.base"

/**
 * HerkunftRevModel
 *
 * columns and relationships of "herkunft_rev"
 */
export const HerkunftRevModel = HerkunftRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
