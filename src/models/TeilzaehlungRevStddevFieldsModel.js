import { TeilzaehlungRevStddevFieldsModelBase } from "./TeilzaehlungRevStddevFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevStddevFieldsModel */
export { selectFromTeilzaehlungRevStddevFields, teilzaehlungRevStddevFieldsModelPrimitives, TeilzaehlungRevStddevFieldsModelSelector } from "./TeilzaehlungRevStddevFieldsModel.base"

/**
 * TeilzaehlungRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const TeilzaehlungRevStddevFieldsModel = TeilzaehlungRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
