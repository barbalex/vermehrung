import { event_rev_stddev_samp_fieldsModelBase } from "./event_rev_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for event_rev_stddev_samp_fieldsModel */
export { selectFromevent_rev_stddev_samp_fields, event_rev_stddev_samp_fieldsModelPrimitives, event_rev_stddev_samp_fieldsModelSelector } from "./event_rev_stddev_samp_fieldsModel.base"

/**
 * event_rev_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const event_rev_stddev_samp_fieldsModel = event_rev_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
