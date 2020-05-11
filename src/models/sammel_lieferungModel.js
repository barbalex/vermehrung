import { sammel_lieferungModelBase } from "./sammel_lieferungModel.base"


/* A graphql query fragment builders for sammel_lieferungModel */
export { selectFromsammel_lieferung, sammel_lieferungModelPrimitives, sammel_lieferungModelSelector } from "./sammel_lieferungModel.base"

/**
 * sammel_lieferungModel
 *
 * columns and relationships of "sammel_lieferung"
 */
export const sammel_lieferungModel = sammel_lieferungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
