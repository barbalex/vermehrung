import { HerkunftRevMaxFieldsModelBase } from "./HerkunftRevMaxFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevMaxFieldsModel */
export { selectFromHerkunftRevMaxFields, herkunftRevMaxFieldsModelPrimitives, HerkunftRevMaxFieldsModelSelector } from "./HerkunftRevMaxFieldsModel.base"

/**
 * HerkunftRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const HerkunftRevMaxFieldsModel = HerkunftRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
