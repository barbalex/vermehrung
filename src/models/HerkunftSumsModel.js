import { HerkunftSumsModelBase } from "./HerkunftSumsModel.base"


/* A graphql query fragment builders for HerkunftSumsModel */
export { selectFromHerkunftSums, herkunftSumsModelPrimitives, HerkunftSumsModelSelector } from "./HerkunftSumsModel.base"

/**
 * HerkunftSumsModel
 *
 * columns and relationships of "herkunft_sums"
 */
export const HerkunftSumsModel = HerkunftSumsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
