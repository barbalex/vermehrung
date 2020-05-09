import { zaehlung_avg_fieldsModelBase } from "./zaehlung_avg_fieldsModel.base"


/* A graphql query fragment builders for zaehlung_avg_fieldsModel */
export { selectFromzaehlung_avg_fields, zaehlung_avg_fieldsModelPrimitives, zaehlung_avg_fieldsModelSelector } from "./zaehlung_avg_fieldsModel.base"

/**
 * zaehlung_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const zaehlung_avg_fieldsModel = zaehlung_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
