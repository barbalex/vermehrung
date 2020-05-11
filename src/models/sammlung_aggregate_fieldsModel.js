import { sammlung_aggregate_fieldsModelBase } from "./sammlung_aggregate_fieldsModel.base"


/* A graphql query fragment builders for sammlung_aggregate_fieldsModel */
export { selectFromsammlung_aggregate_fields, sammlung_aggregate_fieldsModelPrimitives, sammlung_aggregate_fieldsModelSelector } from "./sammlung_aggregate_fieldsModel.base"

/**
 * sammlung_aggregate_fieldsModel
 *
 * aggregate fields of "sammlung"
 */
export const sammlung_aggregate_fieldsModel = sammlung_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
