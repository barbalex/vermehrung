import { KulturQkModelBase } from "./KulturQkModel.base"


/* A graphql query fragment builders for KulturQkModel */
export { selectFromKulturQk, kulturQkModelPrimitives, KulturQkModelSelector } from "./KulturQkModel.base"

/**
 * KulturQkModel
 *
 * columns and relationships of "kultur_qk"
 */
export const KulturQkModel = KulturQkModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
