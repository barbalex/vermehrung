import { HerkunftFileModelBase } from "./HerkunftFileModel.base"


/* A graphql query fragment builders for HerkunftFileModel */
export { selectFromHerkunftFile, herkunftFileModelPrimitives, HerkunftFileModelSelector } from "./HerkunftFileModel.base"

/**
 * HerkunftFileModel
 *
 * columns and relationships of "herkunft_file"
 */
export const HerkunftFileModel = HerkunftFileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
