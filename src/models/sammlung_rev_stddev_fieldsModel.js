import { sammlung_rev_stddev_fieldsModelBase } from "./sammlung_rev_stddev_fieldsModel.base"


/* A graphql query fragment builders for sammlung_rev_stddev_fieldsModel */
export { selectFromsammlung_rev_stddev_fields, sammlung_rev_stddev_fieldsModelPrimitives, sammlung_rev_stddev_fieldsModelSelector } from "./sammlung_rev_stddev_fieldsModel.base"

/**
 * sammlung_rev_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const sammlung_rev_stddev_fieldsModel = sammlung_rev_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
