import { HerkunftSumsMaxFieldsModelBase } from "./HerkunftSumsMaxFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsMaxFieldsModel */
export { selectFromHerkunftSumsMaxFields, herkunftSumsMaxFieldsModelPrimitives, HerkunftSumsMaxFieldsModelSelector } from "./HerkunftSumsMaxFieldsModel.base"

/**
 * HerkunftSumsMaxFieldsModel
 *
 * aggregate max on columns
 */
export const HerkunftSumsMaxFieldsModel = HerkunftSumsMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
