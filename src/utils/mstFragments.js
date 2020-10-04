/**
 * how to: https://github.com/mobxjs/mst-gql#customizing-the-query-result
 * beware
 * extending fragments seems to be dangerous:
 * 1. extending with dependent data: this data will not always appear quickly
 * 2. seems to be bad for performance
 */
import { selectFromzaehlung } from '../models/zaehlungModel.base'

let ZAEHLUNG_FRAGMENT

ZAEHLUNG_FRAGMENT = selectFromzaehlung()
  .id.kultur_id.datum.prognose.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.teilzaehlungs_aggregate(
    (t) =>
      t.aggregate((ag) =>
        ag.sum(
          (s) => s.anzahl_pflanzen.anzahl_auspflanzbereit.anzahl_mutterpflanzen,
        ),
      ),
  )
  .toString()

export { ZAEHLUNG_FRAGMENT }
