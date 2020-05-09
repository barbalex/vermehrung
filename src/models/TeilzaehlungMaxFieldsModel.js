import { TeilzaehlungMaxFieldsModelBase } from "./TeilzaehlungMaxFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungMaxFieldsModel */
export { selectFromTeilzaehlungMaxFields, teilzaehlungMaxFieldsModelPrimitives, TeilzaehlungMaxFieldsModelSelector } from "./TeilzaehlungMaxFieldsModel.base"

/**
 * TeilzaehlungMaxFieldsModel
 *
 * aggregate max on columns
 */
export const TeilzaehlungMaxFieldsModel = TeilzaehlungMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
