import { GartenTeilzaehlungSumsModelBase } from "./GartenTeilzaehlungSumsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsModel */
export { selectFromGartenTeilzaehlungSums, gartenTeilzaehlungSumsModelPrimitives, GartenTeilzaehlungSumsModelSelector } from "./GartenTeilzaehlungSumsModel.base"

/**
 * GartenTeilzaehlungSumsModel
 *
 * columns and relationships of "garten_teilzaehlung_sums"
 */
export const GartenTeilzaehlungSumsModel = GartenTeilzaehlungSumsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
