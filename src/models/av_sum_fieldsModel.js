import { av_sum_fieldsModelBase } from "./av_sum_fieldsModel.base"


/* A graphql query fragment builders for av_sum_fieldsModel */
export { selectFromav_sum_fields, av_sum_fieldsModelPrimitives, av_sum_fieldsModelSelector } from "./av_sum_fieldsModel.base"

/**
 * av_sum_fieldsModel
 */
export const av_sum_fieldsModel = av_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
