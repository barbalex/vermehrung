import { av_max_fieldsModelBase } from "./av_max_fieldsModel.base"


/* A graphql query fragment builders for av_max_fieldsModel */
export { selectFromav_max_fields, av_max_fieldsModelPrimitives, av_max_fieldsModelSelector } from "./av_max_fieldsModel.base"

/**
 * av_max_fieldsModel
 */
export const av_max_fieldsModel = av_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
