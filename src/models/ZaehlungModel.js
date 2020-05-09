import { ZaehlungModelBase } from "./ZaehlungModel.base"


/* A graphql query fragment builders for ZaehlungModel */
export { selectFromZaehlung, zaehlungModelPrimitives, ZaehlungModelSelector } from "./ZaehlungModel.base"

/**
 * ZaehlungModel
 *
 * columns and relationships of "zaehlung"
 */
export const ZaehlungModel = ZaehlungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
