import { EventRevStddevFieldsModelBase } from "./EventRevStddevFieldsModel.base"


/* A graphql query fragment builders for EventRevStddevFieldsModel */
export { selectFromEventRevStddevFields, eventRevStddevFieldsModelPrimitives, EventRevStddevFieldsModelSelector } from "./EventRevStddevFieldsModel.base"

/**
 * EventRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const EventRevStddevFieldsModel = EventRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
