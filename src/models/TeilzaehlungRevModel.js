import { TeilzaehlungRevModelBase } from "./TeilzaehlungRevModel.base"


/* A graphql query fragment builders for TeilzaehlungRevModel */
export { selectFromTeilzaehlungRev, teilzaehlungRevModelPrimitives, TeilzaehlungRevModelSelector } from "./TeilzaehlungRevModel.base"

/**
 * TeilzaehlungRevModel
 *
 * columns and relationships of "teilzaehlung_rev"
 */
export const TeilzaehlungRevModel = TeilzaehlungRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
