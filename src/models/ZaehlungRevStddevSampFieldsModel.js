import { ZaehlungRevStddevSampFieldsModelBase } from "./ZaehlungRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevStddevSampFieldsModel */
export { selectFromZaehlungRevStddevSampFields, zaehlungRevStddevSampFieldsModelPrimitives, ZaehlungRevStddevSampFieldsModelSelector } from "./ZaehlungRevStddevSampFieldsModel.base"

/**
 * ZaehlungRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const ZaehlungRevStddevSampFieldsModel = ZaehlungRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
