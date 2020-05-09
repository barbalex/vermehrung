import { KulturModelBase } from "./KulturModel.base"


/* A graphql query fragment builders for KulturModel */
export { selectFromKultur, kulturModelPrimitives, KulturModelSelector } from "./KulturModel.base"

/**
 * KulturModel
 *
 * columns and relationships of "kultur"
 */
export const KulturModel = KulturModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
