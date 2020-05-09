import { EventRevMutationResponseModelBase } from "./EventRevMutationResponseModel.base"


/* A graphql query fragment builders for EventRevMutationResponseModel */
export { selectFromEventRevMutationResponse, eventRevMutationResponseModelPrimitives, EventRevMutationResponseModelSelector } from "./EventRevMutationResponseModel.base"

/**
 * EventRevMutationResponseModel
 *
 * response of any mutation on the table "event_rev"
 */
export const EventRevMutationResponseModel = EventRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
