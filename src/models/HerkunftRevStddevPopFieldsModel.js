import { HerkunftRevStddevPopFieldsModelBase } from "./HerkunftRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevStddevPopFieldsModel */
export { selectFromHerkunftRevStddevPopFields, herkunftRevStddevPopFieldsModelPrimitives, HerkunftRevStddevPopFieldsModelSelector } from "./HerkunftRevStddevPopFieldsModel.base"

/**
 * HerkunftRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const HerkunftRevStddevPopFieldsModel = HerkunftRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
