import { EventRevMinFieldsModelBase } from "./EventRevMinFieldsModel.base"


/* A graphql query fragment builders for EventRevMinFieldsModel */
export { selectFromEventRevMinFields, eventRevMinFieldsModelPrimitives, EventRevMinFieldsModelSelector } from "./EventRevMinFieldsModel.base"

/**
 * EventRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const EventRevMinFieldsModel = EventRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
