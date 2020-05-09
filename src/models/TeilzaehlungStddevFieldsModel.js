import { TeilzaehlungStddevFieldsModelBase } from "./TeilzaehlungStddevFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungStddevFieldsModel */
export { selectFromTeilzaehlungStddevFields, teilzaehlungStddevFieldsModelPrimitives, TeilzaehlungStddevFieldsModelSelector } from "./TeilzaehlungStddevFieldsModel.base"

/**
 * TeilzaehlungStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const TeilzaehlungStddevFieldsModel = TeilzaehlungStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
