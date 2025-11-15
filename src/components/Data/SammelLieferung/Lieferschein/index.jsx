import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { DateTime } from 'luxon'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { LieferungForLieferschein as Lieferung } from './Lieferung.jsx'
import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { lieferungSort } from '../../../../utils/lieferungSort.js'
import { personFullname } from '../../../../utils/personFullname.js'
import { ProgressiveImg } from '../../../shared/ProgressiveImg.tsx'
import image from '../../../../images/toposLogo.png'

import {
  container,
  pageContainer,
  title,
  headerRow,
  haederLabel,
  paper,
  table,
} from './index.module.css'

export const Lieferschein = observer(({ row }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store

  const [dataState, setDataState] = useState({
    lieferungs: [],
    vonKulturGarten: undefined,
    person: undefined,
  })
  useEffect(() => {
    const lieferungsObservable = row.lieferungs.observe()
    const vonKulturGartenObservable =
      row.von_kultur_id ?
        db
          .get('garten')
          .query(
            Q.where('_deleted', false),
            Q.experimentalJoinTables(['kultur']),
            Q.on('kultur', 'id', row.von_kultur_id),
          )
          .observe()
      : $of({})
    const personObservable = row.person.observe()
    const combinedObservables = combineLatest([
      lieferungsObservable,
      vonKulturGartenObservable,
      personObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([lieferungs, vonKulturGarten, person]) =>
        setDataState({
          lieferungs: lieferungs.sort(lieferungSort),
          vonKulturGarten,
          person,
        }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, row.lieferungs, row.person, row.von_kultur_id])
  const { lieferungs, vonKulturGarten, person } = dataState

  const von =
    row.von_kultur_id ?
      `${vonKulturGarten?.name ?? '(kein Name)'} (${
        vonKulturGarten?.ort ?? 'kein Ort'
      })`
    : '(keine von-Kultur erfasst)'

  const an =
    row.person_id ?
      `${personFullname(person) ?? '(kein Name)'} (${
        person?.ort ?? 'kein Ort'
      })`
    : '(keine Person erfasst)'

  const am =
    row.datum ?
      DateTime.fromSQL(row.datum).toFormat('dd.LL.yyyy')
    : '(Kein Datum erfasst)'

  return (
    <div className={container}>
      <div className={`querformat printer-content ${pageContainer}`}>
        <ProgressiveImg
          src={image}
          placeholderSrc={image}
          alt="topos Logo"
          width="500px"
          height="87px"
        />
        <h3 className={title}>Lieferschein</h3>
        <div className={headerRow}>
          <div className={haederLabel}>Projekt:</div>
          <div>
            {
              'Zwischenvermehrung von seltenen und bedrohten Pflanzenarten im Kanton Zürich'
            }
          </div>
        </div>
        <div className={headerRow}>
          <div className={haederLabel}>von:</div>
          <div>{von}</div>
        </div>
        <div className={headerRow}>
          <div className={haederLabel}>an:</div>
          <div>{an}</div>
        </div>
        <div className={headerRow}>
          <div className={haederLabel}>am:</div>
          <div>{am}</div>
        </div>
        <Paper
          square
          className={paper}
        >
          <Table
            size="small"
            className={table}
          >
            <TableHead>
              <TableRow>
                <TableCell>Art</TableCell>
                <TableCell>Herkunft</TableCell>
                <TableCell>Was</TableCell>
                <TableCell>Bemerkungen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lieferungs.map((l) => (
                <Lieferung
                  key={l.id}
                  lieferung={l}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  )
})
