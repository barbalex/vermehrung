import { TeilzaehlungRevMaxFieldsModelBase } from "./TeilzaehlungRevMaxFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevMaxFieldsModel */
export { selectFromTeilzaehlungRevMaxFields, teilzaehlungRevMaxFieldsModelPrimitives, TeilzaehlungRevMaxFieldsModelSelector } from "./TeilzaehlungRevMaxFieldsModel.base"

/**
 * TeilzaehlungRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const TeilzaehlungRevMaxFieldsModel = TeilzaehlungRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
