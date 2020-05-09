import { av_art_max_fieldsModelBase } from "./av_art_max_fieldsModel.base"


/* A graphql query fragment builders for av_art_max_fieldsModel */
export { selectFromav_art_max_fields, av_art_max_fieldsModelPrimitives, av_art_max_fieldsModelSelector } from "./av_art_max_fieldsModel.base"

/**
 * av_art_max_fieldsModel
 *
 * aggregate max on columns
 */
export const av_art_max_fieldsModel = av_art_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
