import { TeilkulturVarSampFieldsModelBase } from "./TeilkulturVarSampFieldsModel.base"


/* A graphql query fragment builders for TeilkulturVarSampFieldsModel */
export { selectFromTeilkulturVarSampFields, teilkulturVarSampFieldsModelPrimitives, TeilkulturVarSampFieldsModelSelector } from "./TeilkulturVarSampFieldsModel.base"

/**
 * TeilkulturVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const TeilkulturVarSampFieldsModel = TeilkulturVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
