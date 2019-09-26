import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'
import max from 'lodash/max'
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
  ReferenceLine,
  ResponsiveContainer,
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
const Popup = styled.div`
  background-color: white;
  border: 1px solid rgba(74, 20, 140, 0.9);
  opacity: 0.8;
  padding: 8px;
  li {
    margin-bottom: 0;
    font-size: 0.8em;
    font-weight: 400;
    margin-left: -23px;
  }
  ul {
    list-style-type: none;
    margin-bottom: 0;
  }
`
const PTitle = styled.div`
  font-size: 0.8em;
  font-weight: 800;
`

const Kultur = ({ row }) => {
  const zaehlungen = get(row, 'zaehlungs') || []
  const lastZaehlung = zaehlungen.slice(-1)[0]
  const zaehlungenGeplantAll = get(row, 'zaehlungsGeplant') || []
  const zaehlungGeplantToIgnore = zaehlungenGeplantAll.filter(zg =>
    // check if more recent zaehlungen exists
    zaehlungen.some(z => z.datum >= zg.datum),
  )
  const zaehlungGeplantToIgnoreIds = zaehlungGeplantToIgnore.map(l => l.id)
  let zaehlungenGeplant = zaehlungenGeplantAll.filter(
    lg => !zaehlungGeplantToIgnoreIds.includes(lg.id),
  )
  if (zaehlungenGeplant.length) {
    zaehlungenGeplant = [lastZaehlung, ...zaehlungenGeplant]
  }
  // TODO: need to add last zaehlung to zaehlungenGeplant to connect lines
  const zaehlungenData = zaehlungen.map(l => ({
    datum: new Date(l.datum).getTime(),
    Pflanzen: get(l, 'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen'),
    'Pflanzen auspflanzbereit': get(
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
    'Pflanzen auspflanzbereit geplant': get(
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
  const zaehlungenDataCombined = Object.entries(
    zaehlungenDataGroupedByDatum,
    // eslint-disable-next-line no-unused-vars
  ).map(([key, value]) => Object.assign({}, ...value))

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
    ausLieferungen.some(l => l.datum >= lg.datum),
  )
  const ausLieferungGeplantToIgnoreIds = ausLieferungGeplantToIgnore.map(
    l => l.id,
  )
  const ausLieferungGeplantToInclude = ausLieferungenGeplant.filter(
    lg => !ausLieferungGeplantToIgnoreIds.includes(lg.id),
  )
  const anLieferungenData = anLieferungen.map(l => {
    const lastZaehlung =
      [...zaehlungen].reverse().find(z => z.datum < l.datum) || {}
    const lastAnLieferung =
      [...anLieferungen].reverse().find(z => z.datum < l.datum) || {}
    const lastAusLieferung =
      [...ausLieferungen].reverse().find(z => z.datum < l.datum) || {}
    const allSorted = sortBy(
      [lastZaehlung, lastAnLieferung, lastAusLieferung].filter(o => !!o.datum),
      'datum',
    )
    const lastOfAll = allSorted.reverse().find(z => z.datum < l.datum) || {}

    return {
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen': l.anzahl_pflanzen,
      Pflanzen: (lastOfAll.anzahl_pflanzen || 0) + l.anzahl_pflanzen,
      'Lieferung Pflanzen auspflanzbereit': l.anzahl_auspflanzbereit,
      'Pflanzen auspflanzbereit':
        (lastOfAll.anzahl_auspflanzbereit || 0) + l.anzahl_auspflanzbereit,
    }
  })
  const ausLieferungenData = ausLieferungen.map(l => {
    const lastZaehlung =
      [...zaehlungen].reverse().find(z => z.datum < l.datum) || {}
    const lastAnLieferung =
      [...anLieferungen].reverse().find(z => z.datum < l.datum) || {}
    const lastAusLieferung =
      [...ausLieferungen].reverse().find(z => z.datum < l.datum) || {}
    const allSorted = sortBy(
      [lastZaehlung, lastAnLieferung, lastAusLieferung].filter(o => !!o.datum),
      'datum',
    )
    const lastOfAll = allSorted.reverse().find(z => z.datum < l.datum) || {}

    return {
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen': -l.anzahl_pflanzen,
      Pflanzen:
        max([lastOfAll.anzahl_pflanzen, l.anzahl_pflanzen]) - l.anzahl_pflanzen,
      'Lieferung Pflanzen auspflanzbereit': -l.anzahl_auspflanzbereit,
      'Pflanzen auspflanzbereit':
        max([lastOfAll.anzahl_auspflanzbereit, l.anzahl_auspflanzbereit]) -
        l.anzahl_auspflanzbereit,
    }
  })
  const anLieferungenGeplantData = anLieferungGeplantToInclude.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung Pflanzen geplant': l.anzahl_pflanzen,
    'Lieferung Pflanzen auspflanzbereit geplant': l.anzahl_auspflanzbereit,
  }))
  const ausLieferungenGeplantData = ausLieferungGeplantToInclude.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung Pflanzen geplant': -l.anzahl_pflanzen,
    'Lieferung Pflanzen auspflanzbereit geplant': -l.anzahl_auspflanzbereit,
  }))

  /*console.log('Timeline:', {
    anLieferungenData,
    ausLieferungenData,
    anLieferungenGeplantData,
    ausLieferungenGeplantData,
    zaehlungenDataCombined,
  })*/

  const allData = sortBy(
    [
      ...anLieferungenData,
      ...ausLieferungenData,
      ...anLieferungenGeplantData,
      ...ausLieferungenGeplantData,
      ...zaehlungenDataCombined,
    ],
    'datum',
  )

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
          style={{ fontSize: 13 }}
        >
          {new Date(payload.value).toLocaleDateString()}
        </text>
      </g>
    )
  }
  const LabelZaehlung = ({ x, y, stroke, value }) => (
    <text x={x} y={y} dy={-5} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  )
  const LabelLieferung = ({ x, y, stroke, value }) => (
    <text
      x={x + 3}
      y={y}
      dy={12}
      fill={stroke}
      fontSize={10}
      textAnchor="middle"
    >
      {value}
    </text>
  )
  const CustomTooltip = ({ payload, label, active }) => {
    console.log('CustomTooltip', { payload, label, active })

    if (active) {
      return (
        <Popup>
          <PTitle>{new Date(label).toLocaleDateString()}</PTitle>
          <ul>
            {payload.map(o => (
              <li key={o.dataKey}>{`${o.dataKey}: ${o.value}`}</li>
            ))}
          </ul>
        </Popup>
      )
    }

    return null
  }

  if (!row) return null
  if (!allData.length) return null

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>Zeit-Achse</Title>
      </TitleRow>
      <ResponsiveContainer width="99%" height={450}>
        <ComposedChart
          data={allData}
          margin={{ top: 5, right: 0, left: 0, bottom: 45 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datum" tick={renderCustomAxisTick} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            align="right"
            wrapperStyle={{ right: -10, bottom: 95, fontSize: 13 }}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Pflanzen"
            stroke="#8884d8"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Pflanzen auspflanzbereit"
            stroke="#82ca9d"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Mutterpflanzen"
            stroke="#ff7300"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Pflanzen geplant"
            stroke="#d8d8f3"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Pflanzen auspflanzbereit geplant"
            stroke="#dbf0e3"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Mutterpflanzen geplant"
            stroke="#ffe3cc"
            label={<LabelZaehlung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen"
            fill="#8884d8"
            label={<LabelLieferung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen geplant"
            fill="#d8d8f3"
            label={<LabelLieferung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit"
            fill="#82ca9d"
            label={<LabelLieferung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant"
            fill="#dbf0e3"
            label={<LabelLieferung />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  )
}

export default Kultur
