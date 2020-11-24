/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { lieferungModel } from './lieferungModel'
import { lieferungModelSelector } from './lieferungModel.base'

/**
 * lieferung_fileBase
 * auto generated base class for the model lieferung_fileModel.
 */
export const lieferung_fileModelBase = ModelBase.named('lieferung_file')
  .props({
    __typename: types.optional(
      types.literal('lieferung_file'),
      'lieferung_file',
    ),
    _rev_at: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    lieferung_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class lieferung_fileModelSelector extends QueryBuilder {
  get _rev_at() {
    return this.__attr(`_rev_at`)
  }
  get beschreibung() {
    return this.__attr(`beschreibung`)
  }
  get changed() {
    return this.__attr(`changed`)
  }
  get file_id() {
    return this.__attr(`file_id`)
  }
  get file_mime_type() {
    return this.__attr(`file_mime_type`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get lieferung_id() {
    return this.__attr(`lieferung_id`)
  }
  get name() {
    return this.__attr(`name`)
  }
}
export function selectFromlieferung_file() {
  return new lieferung_fileModelSelector()
}

export const lieferung_fileModelPrimitives = selectFromlieferung_file()._rev_at
  .beschreibung.changed.file_id.file_mime_type.lieferung_id.name
