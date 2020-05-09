import { EventRevMaxFieldsModelBase } from "./EventRevMaxFieldsModel.base"


/* A graphql query fragment builders for EventRevMaxFieldsModel */
export { selectFromEventRevMaxFields, eventRevMaxFieldsModelPrimitives, EventRevMaxFieldsModelSelector } from "./EventRevMaxFieldsModel.base"

/**
 * EventRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const EventRevMaxFieldsModel = EventRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
