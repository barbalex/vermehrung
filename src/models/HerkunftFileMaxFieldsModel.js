import { HerkunftFileMaxFieldsModelBase } from "./HerkunftFileMaxFieldsModel.base"


/* A graphql query fragment builders for HerkunftFileMaxFieldsModel */
export { selectFromHerkunftFileMaxFields, herkunftFileMaxFieldsModelPrimitives, HerkunftFileMaxFieldsModelSelector } from "./HerkunftFileMaxFieldsModel.base"

/**
 * HerkunftFileMaxFieldsModel
 *
 * aggregate max on columns
 */
export const HerkunftFileMaxFieldsModel = HerkunftFileMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
