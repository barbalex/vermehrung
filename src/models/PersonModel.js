import { personModelBase } from './personModel.base'

/* A graphql query fragment builders for personModel */
export {
  selectFromperson,
  personModelPrimitives,
  personModelSelector,
} from './personModel.base'

/**
 * personModel
 */
export const personModel = personModelBase.views((self) => ({
  get fullname() {
    if (self.vorname && self.name) return `${self.vorname} ${self.name}`
    if (self.name) return self.name
    if (self.vorname) return self.vorname
    return undefined
  },
}))
