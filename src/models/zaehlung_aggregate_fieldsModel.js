import { zaehlung_aggregate_fieldsModelBase } from "./zaehlung_aggregate_fieldsModel.base"


/* A graphql query fragment builders for zaehlung_aggregate_fieldsModel */
export { selectFromzaehlung_aggregate_fields, zaehlung_aggregate_fieldsModelPrimitives, zaehlung_aggregate_fieldsModelSelector } from "./zaehlung_aggregate_fieldsModel.base"

/**
 * zaehlung_aggregate_fieldsModel
 *
 * aggregate fields of "zaehlung"
 */
export const zaehlung_aggregate_fieldsModel = zaehlung_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
