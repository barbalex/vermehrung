import { EventAvgFieldsModelBase } from "./EventAvgFieldsModel.base"


/* A graphql query fragment builders for EventAvgFieldsModel */
export { selectFromEventAvgFields, eventAvgFieldsModelPrimitives, EventAvgFieldsModelSelector } from "./EventAvgFieldsModel.base"

/**
 * EventAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const EventAvgFieldsModel = EventAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
