import { SammlungFileModelBase } from "./SammlungFileModel.base"


/* A graphql query fragment builders for SammlungFileModel */
export { selectFromSammlungFile, sammlungFileModelPrimitives, SammlungFileModelSelector } from "./SammlungFileModel.base"

/**
 * SammlungFileModel
 *
 * columns and relationships of "sammlung_file"
 */
export const SammlungFileModel = SammlungFileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
