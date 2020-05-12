import { zaehlungModelBase } from "./zaehlungModel.base"


/* A graphql query fragment builders for zaehlungModel */
export { selectFromzaehlung, zaehlungModelPrimitives, zaehlungModelSelector } from "./zaehlungModel.base"

/**
 * zaehlungModel
 */
export const zaehlungModel = zaehlungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
