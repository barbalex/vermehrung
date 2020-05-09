import { KulturOptionModelBase } from "./KulturOptionModel.base"


/* A graphql query fragment builders for KulturOptionModel */
export { selectFromKulturOption, kulturOptionModelPrimitives, KulturOptionModelSelector } from "./KulturOptionModel.base"

/**
 * KulturOptionModel
 *
 * columns and relationships of "kultur_option"
 */
export const KulturOptionModel = KulturOptionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
