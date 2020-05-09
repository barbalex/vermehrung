import { KulturFileModelBase } from "./KulturFileModel.base"


/* A graphql query fragment builders for KulturFileModel */
export { selectFromKulturFile, kulturFileModelPrimitives, KulturFileModelSelector } from "./KulturFileModel.base"

/**
 * KulturFileModel
 *
 * columns and relationships of "kultur_file"
 */
export const KulturFileModel = KulturFileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
