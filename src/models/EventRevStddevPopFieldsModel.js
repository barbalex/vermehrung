import { EventRevStddevPopFieldsModelBase } from "./EventRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for EventRevStddevPopFieldsModel */
export { selectFromEventRevStddevPopFields, eventRevStddevPopFieldsModelPrimitives, EventRevStddevPopFieldsModelSelector } from "./EventRevStddevPopFieldsModel.base"

/**
 * EventRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const EventRevStddevPopFieldsModel = EventRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
