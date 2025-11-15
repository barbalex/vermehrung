import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
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

const Container = styled.div`
  overflow: auto;
  scrollbar-width: thin;
  background-color: #f8f8f8;
  font-size: 9pt;
  cursor: default;
  height: calc(100dvh - 64px - 48px);
  width: 100%;
  @media print {
    /* remove grey background set for nice UI */
    background-color: #fff;
    /* with overflow auto an empty page is inserted between each page */
    overflow-y: visible;
  }
`
const PageContainer = styled.div`
  /* this part is for when page preview is shown */
  /* Divide single pages with some space and center all pages horizontally */
  /* will be removed in @media print */
  margin: 1cm auto;
  /* Define a white paper background that sticks out from the darker overall background */
  background: #fff;
  /* Show a drop shadow beneath each page */
  box-shadow: 0 4px 5px rgba(75, 75, 75, 0.2);

  display: flex;
  flex-direction: column;
  /*justify-content: space-between;*/

  /* set dimensions */
  width: 29.7cm;
  height: 21cm;
  padding: 1.5cm;

  @media print {
    height: 100%;
    width: 100%;

    margin: 0 !important;
    padding: 0.5cm !important;
    overflow-y: hidden !important;
  }
`
const Title = styled.h3`
  padding-top: 15px;
  margin-bottom: 0.4rem;
`
const HeaderRow = styled.div`
  display: flex;
  font-size: small;
`
const HaederLabel = styled.div`
  flex-basis: 50px;
  flex-grow: 0;
`
const StyledPaper = styled(Paper)`
  margin-top: 15px;
  box-shadow: none !important;
`
const StyledTable = styled(Table)`
  margin-bottom: 0;
  td,
  th {
    font-size: 0.75rem;
    padding-left: 8px;
    padding-right: 8px;
  }
  th:first-of-type,
  td:first-of-type {
    padding-left: 8px;
  }
`

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
    <Container>
      <PageContainer className="querformat printer-content">
        <ProgressiveImg
          src={image}
          placeholderSrc={image}
          alt="topos Logo"
          width="500px"
          height="87px"
        />
        <Title>Lieferschein</Title>
        <HeaderRow>
          <HaederLabel>Projekt:</HaederLabel>
          <div>
            {
              'Zwischenvermehrung von seltenen und bedrohten Pflanzenarten im Kanton Zürich'
            }
          </div>
        </HeaderRow>
        <HeaderRow>
          <HaederLabel>von:</HaederLabel>
          <div>{von}</div>
        </HeaderRow>
        <HeaderRow>
          <HaederLabel>an:</HaederLabel>
          <div>{an}</div>
        </HeaderRow>
        <HeaderRow>
          <HaederLabel>am:</HaederLabel>
          <div>{am}</div>
        </HeaderRow>
        <StyledPaper square>
          <StyledTable size="small">
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
          </StyledTable>
        </StyledPaper>
      </PageContainer>
    </Container>
  )
})
