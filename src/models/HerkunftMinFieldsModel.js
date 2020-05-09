import { HerkunftMinFieldsModelBase } from "./HerkunftMinFieldsModel.base"


/* A graphql query fragment builders for HerkunftMinFieldsModel */
export { selectFromHerkunftMinFields, herkunftMinFieldsModelPrimitives, HerkunftMinFieldsModelSelector } from "./HerkunftMinFieldsModel.base"

/**
 * HerkunftMinFieldsModel
 *
 * aggregate min on columns
 */
export const HerkunftMinFieldsModel = HerkunftMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
