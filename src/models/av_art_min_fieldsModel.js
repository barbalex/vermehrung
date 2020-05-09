import { av_art_min_fieldsModelBase } from "./av_art_min_fieldsModel.base"


/* A graphql query fragment builders for av_art_min_fieldsModel */
export { selectFromav_art_min_fields, av_art_min_fieldsModelPrimitives, av_art_min_fieldsModelSelector } from "./av_art_min_fieldsModel.base"

/**
 * av_art_min_fieldsModel
 *
 * aggregate min on columns
 */
export const av_art_min_fieldsModel = av_art_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
