import { HerkunftRevSumFieldsModelBase } from "./HerkunftRevSumFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevSumFieldsModel */
export { selectFromHerkunftRevSumFields, herkunftRevSumFieldsModelPrimitives, HerkunftRevSumFieldsModelSelector } from "./HerkunftRevSumFieldsModel.base"

/**
 * HerkunftRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const HerkunftRevSumFieldsModel = HerkunftRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
