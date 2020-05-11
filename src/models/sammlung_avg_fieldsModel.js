import { sammlung_avg_fieldsModelBase } from "./sammlung_avg_fieldsModel.base"


/* A graphql query fragment builders for sammlung_avg_fieldsModel */
export { selectFromsammlung_avg_fields, sammlung_avg_fieldsModelPrimitives, sammlung_avg_fieldsModelSelector } from "./sammlung_avg_fieldsModel.base"

/**
 * sammlung_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const sammlung_avg_fieldsModel = sammlung_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
