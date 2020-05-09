import { HerkunftRevMinFieldsModelBase } from "./HerkunftRevMinFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevMinFieldsModel */
export { selectFromHerkunftRevMinFields, herkunftRevMinFieldsModelPrimitives, HerkunftRevMinFieldsModelSelector } from "./HerkunftRevMinFieldsModel.base"

/**
 * HerkunftRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const HerkunftRevMinFieldsModel = HerkunftRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
