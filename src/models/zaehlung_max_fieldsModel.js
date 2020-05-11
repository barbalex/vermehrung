import { zaehlung_max_fieldsModelBase } from "./zaehlung_max_fieldsModel.base"


/* A graphql query fragment builders for zaehlung_max_fieldsModel */
export { selectFromzaehlung_max_fields, zaehlung_max_fieldsModelPrimitives, zaehlung_max_fieldsModelSelector } from "./zaehlung_max_fieldsModel.base"

/**
 * zaehlung_max_fieldsModel
 *
 * aggregate max on columns
 */
export const zaehlung_max_fieldsModel = zaehlung_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
