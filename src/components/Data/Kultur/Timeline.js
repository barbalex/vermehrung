import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import ErrorBoundary from 'react-error-boundary'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

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
  const anLieferungen = get(row, 'lieferungsByNachKulturId') || []
  const anLieferungenUngeplant = anLieferungen
    .filter(l => !l.geplant)
    .filter(l => l.datum)
  const anLieferungenGeplant = anLieferungen
    .filter(l => l.geplant)
    .filter(l => l.datum)
  const anLieferungGeplantToIgnore = anLieferungenGeplant.filter(lg =>
    // check if more recent anLieferungenUngeplant exists
    anLieferungenUngeplant.every(lu => lu.datum >= lg.datum),
  )
  const anLieferungGeplantToIgnoreIds = anLieferungGeplantToIgnore.map(
    l => l.id,
  )
  const anLieferungGeplantToInclude = anLieferungenGeplant.filter(
    lg => !anLieferungGeplantToIgnoreIds.includes(lg.id),
  )
  const ausLieferungen = get(row, 'lieferungsByVonKulturId') || []
  const ausLieferungenUngeplant = ausLieferungen
    .filter(l => !l.geplant)
    .filter(l => l.datum)
  const ausLieferungenGeplant = ausLieferungen
    .filter(l => l.geplant)
    .filter(l => l.datum)
  const ausLieferungGeplantToIgnore = ausLieferungenGeplant.filter(lg =>
    // check if more recent ausLieferungenUngeplant exists
    ausLieferungenUngeplant.every(lu => lu.datum >= lg.datum),
  )
  const ausLieferungGeplantToIgnoreIds = ausLieferungGeplantToIgnore.map(
    l => l.id,
  )
  const ausLieferungGeplantToInclude = ausLieferungenGeplant.filter(
    lg => !ausLieferungGeplantToIgnoreIds.includes(lg.id),
  )
  const anLieferungenUngeplantData = anLieferungenUngeplant.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung-Pflanzen': l.anzahl_pflanzen,
    'Lieferung-auspflanzbereit': l.anzahl_auspflanzbereit,
  }))
  const ausLieferungenUngeplantData = ausLieferungenUngeplant.map(l => ({
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
  const lieferungen = sortBy(
    [
      ...anLieferungenUngeplantData,
      ...ausLieferungenUngeplantData,
      ...anLieferungenGeplantData,
      ...ausLieferungenGeplantData,
    ],
    'datum',
  )
  console.log('Kultur', {
    anLieferungenUngeplantData,
    ausLieferungenUngeplantData,
    anLieferungenGeplantData,
    ausLieferungenGeplantData,
    ausLieferungGeplantToIgnore,
    anLieferungGeplantToIgnore,
  })

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
      <BarChart
        width={800}
        height={400}
        data={lieferungen}
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
      </BarChart>
    </ErrorBoundary>
  )
}

export default Kultur
