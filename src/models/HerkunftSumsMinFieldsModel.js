import { HerkunftSumsMinFieldsModelBase } from "./HerkunftSumsMinFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsMinFieldsModel */
export { selectFromHerkunftSumsMinFields, herkunftSumsMinFieldsModelPrimitives, HerkunftSumsMinFieldsModelSelector } from "./HerkunftSumsMinFieldsModel.base"

/**
 * HerkunftSumsMinFieldsModel
 *
 * aggregate min on columns
 */
export const HerkunftSumsMinFieldsModel = HerkunftSumsMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
