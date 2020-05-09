import { HerkunftFileMinFieldsModelBase } from "./HerkunftFileMinFieldsModel.base"


/* A graphql query fragment builders for HerkunftFileMinFieldsModel */
export { selectFromHerkunftFileMinFields, herkunftFileMinFieldsModelPrimitives, HerkunftFileMinFieldsModelSelector } from "./HerkunftFileMinFieldsModel.base"

/**
 * HerkunftFileMinFieldsModel
 *
 * aggregate min on columns
 */
export const HerkunftFileMinFieldsModel = HerkunftFileMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
