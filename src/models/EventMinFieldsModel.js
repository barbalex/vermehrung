import { EventMinFieldsModelBase } from "./EventMinFieldsModel.base"


/* A graphql query fragment builders for EventMinFieldsModel */
export { selectFromEventMinFields, eventMinFieldsModelPrimitives, EventMinFieldsModelSelector } from "./EventMinFieldsModel.base"

/**
 * EventMinFieldsModel
 *
 * aggregate min on columns
 */
export const EventMinFieldsModel = EventMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
