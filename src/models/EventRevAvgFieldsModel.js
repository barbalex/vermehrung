import { EventRevAvgFieldsModelBase } from "./EventRevAvgFieldsModel.base"


/* A graphql query fragment builders for EventRevAvgFieldsModel */
export { selectFromEventRevAvgFields, eventRevAvgFieldsModelPrimitives, EventRevAvgFieldsModelSelector } from "./EventRevAvgFieldsModel.base"

/**
 * EventRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const EventRevAvgFieldsModel = EventRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
