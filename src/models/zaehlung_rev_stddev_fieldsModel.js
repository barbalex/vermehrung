import { zaehlung_rev_stddev_fieldsModelBase } from "./zaehlung_rev_stddev_fieldsModel.base"


/* A graphql query fragment builders for zaehlung_rev_stddev_fieldsModel */
export { selectFromzaehlung_rev_stddev_fields, zaehlung_rev_stddev_fieldsModelPrimitives, zaehlung_rev_stddev_fieldsModelSelector } from "./zaehlung_rev_stddev_fieldsModel.base"

/**
 * zaehlung_rev_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const zaehlung_rev_stddev_fieldsModel = zaehlung_rev_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
