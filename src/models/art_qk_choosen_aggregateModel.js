import { art_qk_choosen_aggregateModelBase } from "./art_qk_choosen_aggregateModel.base"


/* A graphql query fragment builders for art_qk_choosen_aggregateModel */
export { selectFromart_qk_choosen_aggregate, art_qk_choosen_aggregateModelPrimitives, art_qk_choosen_aggregateModelSelector } from "./art_qk_choosen_aggregateModel.base"

/**
 * art_qk_choosen_aggregateModel
 *
 * aggregated selection of "art_qk_choosen"
 */
export const art_qk_choosen_aggregateModel = art_qk_choosen_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
