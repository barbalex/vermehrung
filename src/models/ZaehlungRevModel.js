import { ZaehlungRevModelBase } from "./ZaehlungRevModel.base"


/* A graphql query fragment builders for ZaehlungRevModel */
export { selectFromZaehlungRev, zaehlungRevModelPrimitives, ZaehlungRevModelSelector } from "./ZaehlungRevModel.base"

/**
 * ZaehlungRevModel
 *
 * columns and relationships of "zaehlung_rev"
 */
export const ZaehlungRevModel = ZaehlungRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
