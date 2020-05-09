import { TeilzaehlungRevMinFieldsModelBase } from "./TeilzaehlungRevMinFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevMinFieldsModel */
export { selectFromTeilzaehlungRevMinFields, teilzaehlungRevMinFieldsModelPrimitives, TeilzaehlungRevMinFieldsModelSelector } from "./TeilzaehlungRevMinFieldsModel.base"

/**
 * TeilzaehlungRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const TeilzaehlungRevMinFieldsModel = TeilzaehlungRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
