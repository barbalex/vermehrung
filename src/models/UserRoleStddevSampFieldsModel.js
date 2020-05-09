import { UserRoleStddevSampFieldsModelBase } from "./UserRoleStddevSampFieldsModel.base"


/* A graphql query fragment builders for UserRoleStddevSampFieldsModel */
export { selectFromUserRoleStddevSampFields, userRoleStddevSampFieldsModelPrimitives, UserRoleStddevSampFieldsModelSelector } from "./UserRoleStddevSampFieldsModel.base"

/**
 * UserRoleStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const UserRoleStddevSampFieldsModel = UserRoleStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
