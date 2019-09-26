import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import ErrorBoundary from 'react-error-boundary'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { Object } from 'core-js'

const TitleRow = styled.div`
  background-color: rgba(74, 20, 140, 0.05);
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  margin-top: ${props => (props['data-first'] ? '-10px' : 'unset')};
  padding: 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const Kultur = ({ row }) => {
  const anLieferungen = get(row, 'anLieferungs') || []
  const anLieferungenGeplant = get(row, 'anLieferungsGeplant') || []
  const anLieferungGeplantToIgnore = anLieferungenGeplant.filter(lg =>
    // check if more recent anLieferungen exists
    anLieferungen.every(lu => lu.datum >= lg.datum),
  )
  const anLieferungGeplantToIgnoreIds = anLieferungGeplantToIgnore.map(
    l => l.id,
  )
  const anLieferungGeplantToInclude = anLieferungenGeplant.filter(
    lg => !anLieferungGeplantToIgnoreIds.includes(lg.id),
  )
  const ausLieferungen = get(row, 'ausLieferungs') || []
  const ausLieferungenGeplant = get(row, 'ausLieferungsGeplant') || []
  const ausLieferungGeplantToIgnore = ausLieferungenGeplant.filter(lg =>
    // check if more recent ausLieferungen exists
    ausLieferungen.every(lu => lu.datum >= lg.datum),
  )
  const ausLieferungGeplantToIgnoreIds = ausLieferungGeplantToIgnore.map(
    l => l.id,
  )
  const ausLieferungGeplantToInclude = ausLieferungenGeplant.filter(
    lg => !ausLieferungGeplantToIgnoreIds.includes(lg.id),
  )
  const anLieferungenData = anLieferungen.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung-Pflanzen': l.anzahl_pflanzen,
    'Lieferung-auspflanzbereit': l.anzahl_auspflanzbereit,
  }))
  const ausLieferungenData = ausLieferungen.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung-Pflanzen': -l.anzahl_pflanzen,
    'Lieferung-auspflanzbereit': -l.anzahl_auspflanzbereit,
  }))
  const anLieferungenGeplantData = anLieferungGeplantToInclude.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung-Pflanzen geplant': l.anzahl_pflanzen,
    'Lieferung-auspflanzbereit geplant': l.anzahl_auspflanzbereit,
  }))
  const ausLieferungenGeplantData = ausLieferungGeplantToInclude.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung-Pflanzen geplant': -l.anzahl_pflanzen,
    'Lieferung-auspflanzbereit geplant': -l.anzahl_auspflanzbereit,
  }))

  const zaehlungen = get(row, 'zaehlungs') || []
  const lastZaehlung = zaehlungen.slice(-1)[0]
  const zaehlungenGeplantAll = get(row, 'zaehlungsGeplant') || []
  const zaehlungGeplantToIgnore = zaehlungenGeplantAll.filter(lg =>
    // check if more recent zaehlungen exists
    zaehlungen.every(lu => lu.datum >= lg.datum),
  )
  const zaehlungGeplantToIgnoreIds = zaehlungGeplantToIgnore.map(l => l.id)
  const zaehlungenGeplant = [
    ...zaehlungenGeplantAll.filter(
      lg => !zaehlungGeplantToIgnoreIds.includes(lg.id),
    ),
    // ad last zaehlung to connect lines
    lastZaehlung,
  ]
  //console.log('Kultur, zaehlungen:', zaehlungen)
  //console.log('Kultur, zaehlungenGeplant:', zaehlungenGeplant)
  // TODO: need to add last zaehlung to zaehlungenGeplant to connect lines
  const zaehlungenData = zaehlungen.map(l => ({
    datum: new Date(l.datum).getTime(),
    Pflanzen: get(l, 'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen'),
    auspflanzbereit: get(
      l,
      'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
    ),
    Mutterpflanzen: get(
      l,
      'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
    ),
  }))
  const zaehlungenGeplantData = zaehlungenGeplant.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Pflanzen geplant': get(
      l,
      'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
    ),
    'auspflanzbereit geplant': get(
      l,
      'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
    ),
    'Mutterpflanzen geplant': get(
      l,
      'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
    ),
  }))
  const zaehlungenDataGroupedByDatum = groupBy(
    [...zaehlungenData, ...zaehlungenGeplantData],
    'datum',
  )
  console.log(
    'Kultur, zaehlungenDataGroupedByDatum:',
    zaehlungenDataGroupedByDatum,
  )
  const zaehlungenDataCombined = Object.entries(
    zaehlungenDataGroupedByDatum,
  ).map(([key, value]) => ({ [key]: value.reduce(Object.assign) }))
  /*const zaehlungenDataCombined = Object.values(
    zaehlungenDataGroupedByDatum,
  ).reduce(Object.assign)*/
  //.flatMap(o => o)

  console.log('Kultur, zaehlungenDataCombined:', zaehlungenDataCombined)
  const allData = sortBy(
    [
      ...anLieferungenData,
      ...ausLieferungenData,
      ...anLieferungenGeplantData,
      ...ausLieferungenGeplantData,
      ...zaehlungenData,
      ...zaehlungenGeplantData,
    ],
    'datum',
  )

  //console.log('Kultur, allData:', allData)
  /*console.log(
    'Kultur, zaehlungenDataCombinedGroupedByDatum:',
    groupBy(zaehlungenDataCombined, 'datum'),
  )*/

  const renderCustomAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {new Date(payload.value).toLocaleDateString()}
        </text>
      </g>
    )
  }

  if (!row) return null

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>Zeit-Achse</Title>
      </TitleRow>
      <ComposedChart
        width={800}
        height={400}
        data={allData}
        margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datum" tick={renderCustomAxisTick} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Lieferung-Pflanzen" fill="#8884d8" />
        <Bar dataKey="Lieferung-Pflanzen geplant" fill="#d8d8f3" />
        <Bar dataKey="Lieferung-auspflanzbereit" fill="#82ca9d" />
        <Bar dataKey="Lieferung-auspflanzbereit geplant" fill="#dbf0e3" />
        <Line
          type="monotone"
          connectNulls={true}
          dataKey="Pflanzen"
          stroke="#8884d8"
        />
        <Line
          type="monotone"
          connectNulls={true}
          dataKey="auspflanzbereit"
          stroke="#82ca9d"
        />
        <Line
          type="monotone"
          connectNulls={true}
          dataKey="Mutterpflanzen"
          stroke="#ff7300"
        />
        <Line
          type="monotone"
          connectNulls={true}
          dataKey="Pflanzen geplant"
          stroke="#d8d8f3"
        />
        <Line
          type="monotone"
          connectNulls={true}
          dataKey="auspflanzbereit geplant"
          stroke="#dbf0e3"
        />
        <Line
          type="monotone"
          connectNulls={true}
          dataKey="Mutterpflanzen geplant"
          stroke="#ffe3cc"
        />
      </ComposedChart>
    </ErrorBoundary>
  )
}

export default Kultur
