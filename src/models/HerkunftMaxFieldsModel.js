import { HerkunftMaxFieldsModelBase } from "./HerkunftMaxFieldsModel.base"


/* A graphql query fragment builders for HerkunftMaxFieldsModel */
export { selectFromHerkunftMaxFields, herkunftMaxFieldsModelPrimitives, HerkunftMaxFieldsModelSelector } from "./HerkunftMaxFieldsModel.base"

/**
 * HerkunftMaxFieldsModel
 *
 * aggregate max on columns
 */
export const HerkunftMaxFieldsModel = HerkunftMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
