import { av_min_fieldsModelBase } from "./av_min_fieldsModel.base"


/* A graphql query fragment builders for av_min_fieldsModel */
export { selectFromav_min_fields, av_min_fieldsModelPrimitives, av_min_fieldsModelSelector } from "./av_min_fieldsModel.base"

/**
 * av_min_fieldsModel
 */
export const av_min_fieldsModel = av_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
