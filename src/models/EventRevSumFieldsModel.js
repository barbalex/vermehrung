import { EventRevSumFieldsModelBase } from "./EventRevSumFieldsModel.base"


/* A graphql query fragment builders for EventRevSumFieldsModel */
export { selectFromEventRevSumFields, eventRevSumFieldsModelPrimitives, EventRevSumFieldsModelSelector } from "./EventRevSumFieldsModel.base"

/**
 * EventRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const EventRevSumFieldsModel = EventRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
