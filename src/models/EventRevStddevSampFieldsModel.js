import { EventRevStddevSampFieldsModelBase } from "./EventRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for EventRevStddevSampFieldsModel */
export { selectFromEventRevStddevSampFields, eventRevStddevSampFieldsModelPrimitives, EventRevStddevSampFieldsModelSelector } from "./EventRevStddevSampFieldsModel.base"

/**
 * EventRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const EventRevStddevSampFieldsModel = EventRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
