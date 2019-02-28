import { types } from 'mobx-state-tree'

export const type = types.model({
  id: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  artId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  personId: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  typ: types.optional(types.maybeNull(types.number), null),
  zaehleinheit: types.optional(types.maybeNull(types.number), null),
  menge: types.optional(types.maybeNull(types.number), null),
  masseinheit: types.optional(types.maybeNull(types.number), null),
  vonDatum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  vonSammlungId: types.optional(types.maybeNull(types.number), null),
  vonKulturId: types.optional(types.maybeNull(types.number), null),
  zwischenlager: types.optional(types.maybeNull(types.number), null),
  nachDatum: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
  nachKulturId: types.optional(types.maybeNull(types.number), null),
  nachAusgepflanzt: types.optional(types.maybeNull(types.boolean), null),
  status: types.optional(types.maybeNull(types.number), null),
  bemerkungen: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const initial = {
  id: null,
  artId: null,
  personId: null,
  typ: null,
  zaehleinheit: null,
  menge: null,
  masseinheit: null,
  vonDatum: null,
  vonSammlungId: null,
  vonKulturId: null,
  zwischenlager: null,
  nachDatum: null,
  nachKulturId: null,
  nachAusgepflanzt: null,
  status: null,
  bemerkungen: null,
}

export const simpleTypes = {
  id: 'number',
  artId: 'string',
  personId: 'string',
  typ: 'number',
  zaehleinheit: 'number',
  menge: 'number',
  masseinheit: 'number',
  vonDatum: 'string',
  vonSammlungId: 'number',
  vonKulturId: 'number',
  zwischenlager: 'number',
  nachDatum: 'string',
  nachKulturId: 'number',
  nachAusgepflanzt: 'boolean',
  status: 'number',
  bemerkungen: 'string',
}
