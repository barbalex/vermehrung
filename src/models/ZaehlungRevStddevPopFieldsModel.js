import { ZaehlungRevStddevPopFieldsModelBase } from "./ZaehlungRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevStddevPopFieldsModel */
export { selectFromZaehlungRevStddevPopFields, zaehlungRevStddevPopFieldsModelPrimitives, ZaehlungRevStddevPopFieldsModelSelector } from "./ZaehlungRevStddevPopFieldsModel.base"

/**
 * ZaehlungRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const ZaehlungRevStddevPopFieldsModel = ZaehlungRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
