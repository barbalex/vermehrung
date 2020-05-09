import { HerkunftSumFieldsModelBase } from "./HerkunftSumFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumFieldsModel */
export { selectFromHerkunftSumFields, herkunftSumFieldsModelPrimitives, HerkunftSumFieldsModelSelector } from "./HerkunftSumFieldsModel.base"

/**
 * HerkunftSumFieldsModel
 *
 * aggregate sum on columns
 */
export const HerkunftSumFieldsModel = HerkunftSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
