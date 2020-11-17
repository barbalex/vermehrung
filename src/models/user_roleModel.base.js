/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { personModel } from './personModel'
import { personModelSelector } from './personModel.base'
import { person_revModel } from './person_revModel'
import { person_revModelSelector } from './person_revModel.base'

/**
 * user_roleBase
 * auto generated base class for the model user_roleModel.
 */
export const user_roleModelBase = ModelBase.named('user_role')
  .props({
    __typename: types.optional(types.literal('user_role'), 'user_role'),
    changed: types.union(types.undefined, types.null, types.frozen()),
    comment: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    label: types.union(types.undefined, types.null, types.string),
    name: types.union(types.undefined, types.string),
    sort: types.union(types.undefined, types.null, types.integer),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class user_roleModelSelector extends QueryBuilder {
  get changed() {
    return this.__attr(`changed`)
  }
  get comment() {
    return this.__attr(`comment`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get label() {
    return this.__attr(`label`)
  }
  get name() {
    return this.__attr(`name`)
  }
  get sort() {
    return this.__attr(`sort`)
  }
}
export function selectFromuser_role() {
  return new user_roleModelSelector()
}

export const user_roleModelPrimitives = selectFromuser_role().changed.comment
  .label.name.sort
