import { ZaehlungRevMaxFieldsModelBase } from "./ZaehlungRevMaxFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevMaxFieldsModel */
export { selectFromZaehlungRevMaxFields, zaehlungRevMaxFieldsModelPrimitives, ZaehlungRevMaxFieldsModelSelector } from "./ZaehlungRevMaxFieldsModel.base"

/**
 * ZaehlungRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const ZaehlungRevMaxFieldsModel = ZaehlungRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
