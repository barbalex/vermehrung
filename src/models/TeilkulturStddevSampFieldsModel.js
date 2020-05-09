import { TeilkulturStddevSampFieldsModelBase } from "./TeilkulturStddevSampFieldsModel.base"


/* A graphql query fragment builders for TeilkulturStddevSampFieldsModel */
export { selectFromTeilkulturStddevSampFields, teilkulturStddevSampFieldsModelPrimitives, TeilkulturStddevSampFieldsModelSelector } from "./TeilkulturStddevSampFieldsModel.base"

/**
 * TeilkulturStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const TeilkulturStddevSampFieldsModel = TeilkulturStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
