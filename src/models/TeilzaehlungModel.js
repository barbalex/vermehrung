import { TeilzaehlungModelBase } from "./TeilzaehlungModel.base"


/* A graphql query fragment builders for TeilzaehlungModel */
export { selectFromTeilzaehlung, teilzaehlungModelPrimitives, TeilzaehlungModelSelector } from "./TeilzaehlungModel.base"

/**
 * TeilzaehlungModel
 *
 * columns and relationships of "teilzaehlung"
 */
export const TeilzaehlungModel = TeilzaehlungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
