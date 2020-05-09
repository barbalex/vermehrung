import { EventSumFieldsModelBase } from "./EventSumFieldsModel.base"


/* A graphql query fragment builders for EventSumFieldsModel */
export { selectFromEventSumFields, eventSumFieldsModelPrimitives, EventSumFieldsModelSelector } from "./EventSumFieldsModel.base"

/**
 * EventSumFieldsModel
 *
 * aggregate sum on columns
 */
export const EventSumFieldsModel = EventSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
