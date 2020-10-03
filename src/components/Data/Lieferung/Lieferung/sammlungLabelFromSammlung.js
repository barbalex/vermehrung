import { DateTime } from 'luxon'

import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'

export default ({ sammlung, store }) => {
  if (!sammlung) return '(keine Sammlung)'
  const person = sammlung.person_id ? store.persons.get(sammlung.person_id) : {}
  const herkunft = sammlung.herkunft_id
    ? store.herkunfts.get(sammlung.herkunft_id)
    : {}
  const datum = sammlung?.datum
    ? DateTime.fromSQL(sammlung.datum).toFormat('dd.LL.yyyy')
    : '(kein Datum)'
  const personLabel = person?.fullname ?? '(kein Name)'
  const label = `${datum}: von ${herkunftLabelFromHerkunft({
    herkunft,
    store,
  })}; ${personLabel}`

  return label
}
