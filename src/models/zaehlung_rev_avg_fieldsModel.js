import { zaehlung_rev_avg_fieldsModelBase } from "./zaehlung_rev_avg_fieldsModel.base"


/* A graphql query fragment builders for zaehlung_rev_avg_fieldsModel */
export { selectFromzaehlung_rev_avg_fields, zaehlung_rev_avg_fieldsModelPrimitives, zaehlung_rev_avg_fieldsModelSelector } from "./zaehlung_rev_avg_fieldsModel.base"

/**
 * zaehlung_rev_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const zaehlung_rev_avg_fieldsModel = zaehlung_rev_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
