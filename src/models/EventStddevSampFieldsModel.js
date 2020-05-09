import { EventStddevSampFieldsModelBase } from "./EventStddevSampFieldsModel.base"


/* A graphql query fragment builders for EventStddevSampFieldsModel */
export { selectFromEventStddevSampFields, eventStddevSampFieldsModelPrimitives, EventStddevSampFieldsModelSelector } from "./EventStddevSampFieldsModel.base"

/**
 * EventStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const EventStddevSampFieldsModel = EventStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
