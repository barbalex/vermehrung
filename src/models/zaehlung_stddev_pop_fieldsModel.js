import { zaehlung_stddev_pop_fieldsModelBase } from "./zaehlung_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for zaehlung_stddev_pop_fieldsModel */
export { selectFromzaehlung_stddev_pop_fields, zaehlung_stddev_pop_fieldsModelPrimitives, zaehlung_stddev_pop_fieldsModelSelector } from "./zaehlung_stddev_pop_fieldsModel.base"

/**
 * zaehlung_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const zaehlung_stddev_pop_fieldsModel = zaehlung_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
