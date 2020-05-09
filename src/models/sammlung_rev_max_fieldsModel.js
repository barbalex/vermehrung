import { sammlung_rev_max_fieldsModelBase } from "./sammlung_rev_max_fieldsModel.base"


/* A graphql query fragment builders for sammlung_rev_max_fieldsModel */
export { selectFromsammlung_rev_max_fields, sammlung_rev_max_fieldsModelPrimitives, sammlung_rev_max_fieldsModelSelector } from "./sammlung_rev_max_fieldsModel.base"

/**
 * sammlung_rev_max_fieldsModel
 *
 * aggregate max on columns
 */
export const sammlung_rev_max_fieldsModel = sammlung_rev_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
