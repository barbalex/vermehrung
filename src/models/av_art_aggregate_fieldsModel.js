import { av_art_aggregate_fieldsModelBase } from "./av_art_aggregate_fieldsModel.base"


/* A graphql query fragment builders for av_art_aggregate_fieldsModel */
export { selectFromav_art_aggregate_fields, av_art_aggregate_fieldsModelPrimitives, av_art_aggregate_fieldsModelSelector } from "./av_art_aggregate_fieldsModel.base"

/**
 * av_art_aggregate_fieldsModel
 *
 * aggregate fields of "av_art"
 */
export const av_art_aggregate_fieldsModel = av_art_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
