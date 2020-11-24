import { av_stddev_fieldsModelBase } from "./av_stddev_fieldsModel.base"


/* A graphql query fragment builders for av_stddev_fieldsModel */
export { selectFromav_stddev_fields, av_stddev_fieldsModelPrimitives, av_stddev_fieldsModelSelector } from "./av_stddev_fieldsModel.base"

/**
 * av_stddev_fieldsModel
 */
export const av_stddev_fieldsModel = av_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
