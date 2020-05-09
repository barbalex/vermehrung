import { zaehlung_min_fieldsModelBase } from "./zaehlung_min_fieldsModel.base"


/* A graphql query fragment builders for zaehlung_min_fieldsModel */
export { selectFromzaehlung_min_fields, zaehlung_min_fieldsModelPrimitives, zaehlung_min_fieldsModelSelector } from "./zaehlung_min_fieldsModel.base"

/**
 * zaehlung_min_fieldsModel
 *
 * aggregate min on columns
 */
export const zaehlung_min_fieldsModel = zaehlung_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
