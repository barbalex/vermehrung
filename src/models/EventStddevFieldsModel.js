import { EventStddevFieldsModelBase } from "./EventStddevFieldsModel.base"


/* A graphql query fragment builders for EventStddevFieldsModel */
export { selectFromEventStddevFields, eventStddevFieldsModelPrimitives, EventStddevFieldsModelSelector } from "./EventStddevFieldsModel.base"

/**
 * EventStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const EventStddevFieldsModel = EventStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
