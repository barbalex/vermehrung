import { teilzaehlung_aggregateModelBase } from "./teilzaehlung_aggregateModel.base"


/* A graphql query fragment builders for teilzaehlung_aggregateModel */
export { selectFromteilzaehlung_aggregate, teilzaehlung_aggregateModelPrimitives, teilzaehlung_aggregateModelSelector } from "./teilzaehlung_aggregateModel.base"

/**
 * teilzaehlung_aggregateModel
 */
export const teilzaehlung_aggregateModel = teilzaehlung_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
