import { kultur_qk_revModelBase } from "./kultur_qk_revModel.base"


/* A graphql query fragment builders for kultur_qk_revModel */
export { selectFromkultur_qk_rev, kultur_qk_revModelPrimitives, kultur_qk_revModelSelector } from "./kultur_qk_revModel.base"

/**
 * kultur_qk_revModel
 */
export const kultur_qk_revModel = kultur_qk_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
