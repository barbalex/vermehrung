import { EventStddevPopFieldsModelBase } from "./EventStddevPopFieldsModel.base"


/* A graphql query fragment builders for EventStddevPopFieldsModel */
export { selectFromEventStddevPopFields, eventStddevPopFieldsModelPrimitives, EventStddevPopFieldsModelSelector } from "./EventStddevPopFieldsModel.base"

/**
 * EventStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const EventStddevPopFieldsModel = EventStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
