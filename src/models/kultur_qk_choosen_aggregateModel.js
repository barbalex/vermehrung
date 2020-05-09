import { kultur_qk_choosen_aggregateModelBase } from "./kultur_qk_choosen_aggregateModel.base"


/* A graphql query fragment builders for kultur_qk_choosen_aggregateModel */
export { selectFromkultur_qk_choosen_aggregate, kultur_qk_choosen_aggregateModelPrimitives, kultur_qk_choosen_aggregateModelSelector } from "./kultur_qk_choosen_aggregateModel.base"

/**
 * kultur_qk_choosen_aggregateModel
 *
 * aggregated selection of "kultur_qk_choosen"
 */
export const kultur_qk_choosen_aggregateModel = kultur_qk_choosen_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
