import { teilzaehlungModelBase } from "./teilzaehlungModel.base"


/* A graphql query fragment builders for teilzaehlungModel */
export { selectFromteilzaehlung, teilzaehlungModelPrimitives, teilzaehlungModelSelector } from "./teilzaehlungModel.base"

/**
 * teilzaehlungModel
 *
 * columns and relationships of "teilzaehlung"
 */
export const teilzaehlungModel = teilzaehlungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
