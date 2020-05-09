import { TeilzaehlungMinFieldsModelBase } from "./TeilzaehlungMinFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungMinFieldsModel */
export { selectFromTeilzaehlungMinFields, teilzaehlungMinFieldsModelPrimitives, TeilzaehlungMinFieldsModelSelector } from "./TeilzaehlungMinFieldsModel.base"

/**
 * TeilzaehlungMinFieldsModel
 *
 * aggregate min on columns
 */
export const TeilzaehlungMinFieldsModel = TeilzaehlungMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
