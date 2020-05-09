import { subscription_rootModelBase } from "./subscription_rootModel.base"


/* A graphql query fragment builders for subscription_rootModel */
export { selectFromsubscription_root, subscription_rootModelPrimitives, subscription_rootModelSelector } from "./subscription_rootModel.base"

/**
 * subscription_rootModel
 *
 * subscription root
 */
export const subscription_rootModel = subscription_rootModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
