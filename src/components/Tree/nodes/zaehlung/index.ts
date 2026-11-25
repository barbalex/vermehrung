import { groupBy } from 'es-toolkit'
import type { Database } from 'nitromelondb'
import type { Teilzaehlung, Zaehlung } from '../../../../dbModel.ts'
import { zaehlungLabelFromZaehlung } from '../../../../utils/zaehlungLabelFromZaehlung.ts'

export const buildZaehlungNodes = async (
  db: Database,
  zaehlungs: Zaehlung[],
) => {
  // The individual model labels each fetch their children. For the whole
  // folder, read the same children in one round trip to the SQLite worker.
  const children = await db.get<Teilzaehlung>('teilzaehlung').query().fetch()
  const byZaehlung = groupBy(children, (tz) => tz.zaehlung_id ?? '')
  return zaehlungs.map((zaehlung, index) => ({
    nodeType: 'table',
    menuTitle: 'Zählung',
    table: 'zaehlung',
    id: zaehlung.id,
    label: zaehlungLabelFromZaehlung({
      zaehlung,
      teilzaehlungs: byZaehlung[zaehlung.id],
    }),
    url: ['Zaehlungen', zaehlung.id],
    sort: [7, index],
    hasChildren: false,
    mono: true,
  }))
}
