import { herkunft_rev_stddev_fieldsModelBase } from "./herkunft_rev_stddev_fieldsModel.base"


/* A graphql query fragment builders for herkunft_rev_stddev_fieldsModel */
export { selectFromherkunft_rev_stddev_fields, herkunft_rev_stddev_fieldsModelPrimitives, herkunft_rev_stddev_fieldsModelSelector } from "./herkunft_rev_stddev_fieldsModel.base"

/**
 * herkunft_rev_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const herkunft_rev_stddev_fieldsModel = herkunft_rev_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
