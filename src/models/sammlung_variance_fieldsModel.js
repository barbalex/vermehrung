import { sammlung_variance_fieldsModelBase } from "./sammlung_variance_fieldsModel.base"


/* A graphql query fragment builders for sammlung_variance_fieldsModel */
export { selectFromsammlung_variance_fields, sammlung_variance_fieldsModelPrimitives, sammlung_variance_fieldsModelSelector } from "./sammlung_variance_fieldsModel.base"

/**
 * sammlung_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const sammlung_variance_fieldsModel = sammlung_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
