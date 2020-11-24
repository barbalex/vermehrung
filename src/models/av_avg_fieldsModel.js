import { av_avg_fieldsModelBase } from "./av_avg_fieldsModel.base"


/* A graphql query fragment builders for av_avg_fieldsModel */
export { selectFromav_avg_fields, av_avg_fieldsModelPrimitives, av_avg_fieldsModelSelector } from "./av_avg_fieldsModel.base"

/**
 * av_avg_fieldsModel
 */
export const av_avg_fieldsModel = av_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
