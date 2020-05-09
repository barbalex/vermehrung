import { EventMaxFieldsModelBase } from "./EventMaxFieldsModel.base"


/* A graphql query fragment builders for EventMaxFieldsModel */
export { selectFromEventMaxFields, eventMaxFieldsModelPrimitives, EventMaxFieldsModelSelector } from "./EventMaxFieldsModel.base"

/**
 * EventMaxFieldsModel
 *
 * aggregate max on columns
 */
export const EventMaxFieldsModel = EventMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
