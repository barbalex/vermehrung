import { KulturRevModelBase } from "./KulturRevModel.base"


/* A graphql query fragment builders for KulturRevModel */
export { selectFromKulturRev, kulturRevModelPrimitives, KulturRevModelSelector } from "./KulturRevModel.base"

/**
 * KulturRevModel
 *
 * columns and relationships of "kultur_rev"
 */
export const KulturRevModel = KulturRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
