import { KulturOptionRevModelBase } from "./KulturOptionRevModel.base"


/* A graphql query fragment builders for KulturOptionRevModel */
export { selectFromKulturOptionRev, kulturOptionRevModelPrimitives, KulturOptionRevModelSelector } from "./KulturOptionRevModel.base"

/**
 * KulturOptionRevModel
 *
 * columns and relationships of "kultur_option_rev"
 */
export const KulturOptionRevModel = KulturOptionRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
