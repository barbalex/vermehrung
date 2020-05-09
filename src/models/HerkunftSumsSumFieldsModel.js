import { HerkunftSumsSumFieldsModelBase } from "./HerkunftSumsSumFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsSumFieldsModel */
export { selectFromHerkunftSumsSumFields, herkunftSumsSumFieldsModelPrimitives, HerkunftSumsSumFieldsModelSelector } from "./HerkunftSumsSumFieldsModel.base"

/**
 * HerkunftSumsSumFieldsModel
 *
 * aggregate sum on columns
 */
export const HerkunftSumsSumFieldsModel = HerkunftSumsSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
