import { EventRevVarianceFieldsModelBase } from "./EventRevVarianceFieldsModel.base"


/* A graphql query fragment builders for EventRevVarianceFieldsModel */
export { selectFromEventRevVarianceFields, eventRevVarianceFieldsModelPrimitives, EventRevVarianceFieldsModelSelector } from "./EventRevVarianceFieldsModel.base"

/**
 * EventRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const EventRevVarianceFieldsModel = EventRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
