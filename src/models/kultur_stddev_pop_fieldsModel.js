import { kultur_stddev_pop_fieldsModelBase } from "./kultur_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for kultur_stddev_pop_fieldsModel */
export { selectFromkultur_stddev_pop_fields, kultur_stddev_pop_fieldsModelPrimitives, kultur_stddev_pop_fieldsModelSelector } from "./kultur_stddev_pop_fieldsModel.base"

/**
 * kultur_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const kultur_stddev_pop_fieldsModel = kultur_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
