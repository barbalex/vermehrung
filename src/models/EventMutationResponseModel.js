import { EventMutationResponseModelBase } from "./EventMutationResponseModel.base"


/* A graphql query fragment builders for EventMutationResponseModel */
export { selectFromEventMutationResponse, eventMutationResponseModelPrimitives, EventMutationResponseModelSelector } from "./EventMutationResponseModel.base"

/**
 * EventMutationResponseModel
 *
 * response of any mutation on the table "event"
 */
export const EventMutationResponseModel = EventMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
