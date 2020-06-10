import { av_aggregate_fieldsModelBase } from "./av_aggregate_fieldsModel.base"


/* A graphql query fragment builders for av_aggregate_fieldsModel */
export { selectFromav_aggregate_fields, av_aggregate_fieldsModelPrimitives, av_aggregate_fieldsModelSelector } from "./av_aggregate_fieldsModel.base"

/**
 * av_aggregate_fieldsModel
 */
export const av_aggregate_fieldsModel = av_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
