import { EventVarianceFieldsModelBase } from "./EventVarianceFieldsModel.base"


/* A graphql query fragment builders for EventVarianceFieldsModel */
export { selectFromEventVarianceFields, eventVarianceFieldsModelPrimitives, EventVarianceFieldsModelSelector } from "./EventVarianceFieldsModel.base"

/**
 * EventVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const EventVarianceFieldsModel = EventVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
