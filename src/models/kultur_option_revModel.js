import { kultur_option_revModelBase } from "./kultur_option_revModel.base"


/* A graphql query fragment builders for kultur_option_revModel */
export { selectFromkultur_option_rev, kultur_option_revModelPrimitives, kultur_option_revModelSelector } from "./kultur_option_revModel.base"

/**
 * kultur_option_revModel
 *
 * columns and relationships of "kultur_option_rev"
 */
export const kultur_option_revModel = kultur_option_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
