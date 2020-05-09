import { TeilzaehlungRevStddevPopFieldsModelBase } from "./TeilzaehlungRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevStddevPopFieldsModel */
export { selectFromTeilzaehlungRevStddevPopFields, teilzaehlungRevStddevPopFieldsModelPrimitives, TeilzaehlungRevStddevPopFieldsModelSelector } from "./TeilzaehlungRevStddevPopFieldsModel.base"

/**
 * TeilzaehlungRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const TeilzaehlungRevStddevPopFieldsModel = TeilzaehlungRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
