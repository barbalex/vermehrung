import { ZaehlungMaxFieldsModelBase } from "./ZaehlungMaxFieldsModel.base"


/* A graphql query fragment builders for ZaehlungMaxFieldsModel */
export { selectFromZaehlungMaxFields, zaehlungMaxFieldsModelPrimitives, ZaehlungMaxFieldsModelSelector } from "./ZaehlungMaxFieldsModel.base"

/**
 * ZaehlungMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ZaehlungMaxFieldsModel = ZaehlungMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
