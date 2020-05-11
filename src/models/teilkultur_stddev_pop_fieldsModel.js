import { teilkultur_stddev_pop_fieldsModelBase } from "./teilkultur_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for teilkultur_stddev_pop_fieldsModel */
export { selectFromteilkultur_stddev_pop_fields, teilkultur_stddev_pop_fieldsModelPrimitives, teilkultur_stddev_pop_fieldsModelSelector } from "./teilkultur_stddev_pop_fieldsModel.base"

/**
 * teilkultur_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const teilkultur_stddev_pop_fieldsModel = teilkultur_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
