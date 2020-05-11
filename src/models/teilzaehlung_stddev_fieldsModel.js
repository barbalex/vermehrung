import { teilzaehlung_stddev_fieldsModelBase } from "./teilzaehlung_stddev_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_stddev_fieldsModel */
export { selectFromteilzaehlung_stddev_fields, teilzaehlung_stddev_fieldsModelPrimitives, teilzaehlung_stddev_fieldsModelSelector } from "./teilzaehlung_stddev_fieldsModel.base"

/**
 * teilzaehlung_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const teilzaehlung_stddev_fieldsModel = teilzaehlung_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
