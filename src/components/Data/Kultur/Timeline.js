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
  const zaehlungGeplantIgnored = zaehlungenGeplantAll.filter(zg =>
    // check if more recent zaehlungen exists
    zaehlungen.some(z => z.datum >= zg.datum),
  )
  const zaehlungGeplantIgnoredIds = zaehlungGeplantIgnored.map(l => l.id)
  let zaehlungenGeplant = zaehlungenGeplantAll.filter(
    lg => !zaehlungGeplantIgnoredIds.includes(lg.id),
  )
  if (zaehlungenGeplant.length) {
    zaehlungenGeplant = [lastZaehlung, ...zaehlungenGeplant]
  }
  // TODO: need to add last zaehlung to zaehlungenGeplant to connect lines
  const zaehlungenData = zaehlungen.map(l => {
    const teilzaehlungs = get(l, 'teilzaehlungs')

    return {
      datum: new Date(l.datum).getTime(),
      'Zählung Pflanzen': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
      ),
      'Zählung Pflanzen auspflanzbereit': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
      ),
      'Zählung Mutterpflanzen': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
      ),
      'Zählung andere Mengen': teilzaehlungs
        .map(t => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map(t => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map(t => t.bemerkungen).join(', '),
    }
  })
  const zaehlungenGeplantData = zaehlungenGeplant.map(l => {
    const teilzaehlungs = get(l, 'teilzaehlungs')

    return {
      datum: new Date(l.datum).getTime(),
      'Zählung Pflanzen geplant': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
      ),
      'Zählung Pflanzen auspflanzbereit geplant': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
      ),
      'Zählung Mutterpflanzen geplant': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
      ),
      'Zählung andere Mengen': teilzaehlungs
        .map(t => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map(t => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map(t => t.bemerkungen).join(', '),
    }
  })
  const zaehlungenGeplantIgnoredData = zaehlungGeplantIgnored.map(l => {
    const teilzaehlungs = get(l, 'teilzaehlungs')

    return {
      datum: new Date(l.datum).getTime(),
      'Zählung Pflanzen geplant, ignoriert': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen',
      ),
      'Zählung Pflanzen auspflanzbereit geplant, ignoriert': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_auspflanzbereit',
      ),
      'Zählung Mutterpflanzen geplant, ignoriert': get(
        l,
        'teilzaehlungs_aggregate.aggregate.sum.anzahl_mutterpflanzen',
      ),
      'Zählung andere Mengen': teilzaehlungs
        .map(t => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map(t => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map(t => t.bemerkungen).join(', '),
    }
  })
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
  const anLieferungGeplantIgnored = anLieferungenGeplant.filter(lg =>
    // check if more recent anLieferungen exists
    anLieferungen.every(lu => lu.datum >= lg.datum),
  )
  const anLieferungGeplantIgnoredIds = anLieferungGeplantIgnored.map(l => l.id)
  const anLieferungGeplantIncluded = anLieferungenGeplant.filter(
    lg => !anLieferungGeplantIgnoredIds.includes(lg.id),
  )
  const ausLieferungen = get(row, 'ausLieferungs') || []
  const ausLieferungenGeplant = get(row, 'ausLieferungsGeplant') || []
  const ausLieferungGeplantIgnored = ausLieferungenGeplant.filter(lg =>
    // check if more recent ausLieferungen exists
    ausLieferungen.some(l => l.datum >= lg.datum),
  )
  const ausLieferungGeplantIgnoredIds = ausLieferungGeplantIgnored.map(
    l => l.id,
  )
  const ausLieferungGeplantIncluded = ausLieferungenGeplant.filter(
    lg => !ausLieferungGeplantIgnoredIds.includes(lg.id),
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
      'Zählung Pflanzen': (lastOfAll.anzahl_pflanzen || 0) + l.anzahl_pflanzen,
      'Lieferung Pflanzen auspflanzbereit': l.anzahl_auspflanzbereit,
      'Zählung Pflanzen auspflanzbereit':
        (lastOfAll.anzahl_auspflanzbereit || 0) + l.anzahl_auspflanzbereit,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
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
      'Zählung Pflanzen':
        max([lastOfAll.anzahl_pflanzen, l.anzahl_pflanzen]) - l.anzahl_pflanzen,
      'Lieferung Pflanzen auspflanzbereit': -l.anzahl_auspflanzbereit,
      'Zählung Pflanzen auspflanzbereit':
        max([lastOfAll.anzahl_auspflanzbereit, l.anzahl_auspflanzbereit]) -
        l.anzahl_auspflanzbereit,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
    }
  })
  const anLieferungenGeplantData = anLieferungGeplantIncluded.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung Pflanzen geplant': l.anzahl_pflanzen,
    'Lieferung Pflanzen auspflanzbereit geplant': l.anzahl_auspflanzbereit,
    'Lieferung andere Mengen': l.andere_menge,
    'Lieferung Gramm Samen': l.gramm_samen,
    'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
    'Lieferung Bemerkungen': l.bemerkungen,
  }))
  const anLieferungenGeplantIgnoredData = anLieferungGeplantIgnored.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung Pflanzen geplant, ignoriert': l.anzahl_pflanzen,
    'Lieferung Pflanzen auspflanzbereit geplant, ignoriert':
      l.anzahl_auspflanzbereit,
    'Lieferung andere Mengen': l.andere_menge,
    'Lieferung Gramm Samen': l.gramm_samen,
    'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
    'Lieferung Bemerkungen': l.bemerkungen,
  }))
  const ausLieferungenGeplantData = ausLieferungGeplantIncluded.map(l => ({
    datum: new Date(l.datum).getTime(),
    'Lieferung Pflanzen geplant': -l.anzahl_pflanzen,
    'Lieferung Pflanzen auspflanzbereit geplant': -l.anzahl_auspflanzbereit,
    'Lieferung andere Mengen': l.andere_menge,
    'Lieferung Gramm Samen': l.gramm_samen,
    'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
    'Lieferung Bemerkungen': l.bemerkungen,
  }))
  const ausLieferungenGeplantIgnoredData = ausLieferungGeplantIgnored.map(
    l => ({
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen geplant, ignoriert': -l.anzahl_pflanzen,
      'Lieferung Pflanzen auspflanzbereit geplant, ignoriert': -l.anzahl_auspflanzbereit,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
    }),
  )

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
      ...anLieferungenGeplantIgnoredData,
      ...ausLieferungenGeplantData,
      ...ausLieferungenGeplantIgnoredData,
      ...zaehlungenDataCombined,
      ...zaehlungenGeplantIgnoredData,
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
    if (active) {
      return (
        <Popup>
          <PTitle>{new Date(label).toLocaleDateString()}</PTitle>
          <ul>
            {payload.map((o, i) => {
              // if this payload is last non summable values
              if (i === payload.length - 1) {
                return (
                  <>
                    <li key={o.dataKey}>{`${o.dataKey}: ${o.value}`}</li>
                    {o.payload['Lieferung Gramm Samen'] && (
                      <li key={`${o.dataKey}1`}>{`Lieferung Gramm Samen: ${
                        o.payload['Lieferung Gramm Samen']
                      }`}</li>
                    )}
                    {o.payload['Zählung andere Mengen'] && (
                      <li key={`${o.dataKey}2`}>{`Zählung andere Mengen: ${
                        o.payload['Zählung andere Mengen']
                      }`}</li>
                    )}
                    {o.payload['Lieferung andere Mengen'] && (
                      <li key={`${o.dataKey}3`}>{`Lieferung andere Mengen: ${
                        o.payload['Lieferung andere Mengen']
                      }`}</li>
                    )}
                    {o.payload['Lieferung von Anzahl Individuen'] && (
                      <li
                        key={`${o.dataKey}4`}
                      >{`Lieferung von Anzahl Individuen: ${
                        o.payload['Lieferung von Anzahl Individuen']
                      }`}</li>
                    )}
                    {o.payload[
                      'Zählung Beschreibung auspflanzbereite Pflanzen'
                    ] && (
                      <li
                        key={`${o.dataKey}5`}
                      >{`Zählung Beschreibung auspflanzbereite Pflanzen: ${
                        o.payload[
                          'Zählung Beschreibung auspflanzbereite Pflanzen'
                        ]
                      }`}</li>
                    )}
                    {o.payload[
                      'Lieferung Beschreibung auspflanzbereite Pflanzen'
                    ] && (
                      <li
                        key={`${o.dataKey}6`}
                      >{`Lieferung Beschreibung auspflanzbereite Pflanzen: ${
                        o.payload[
                          'Lieferung Beschreibung auspflanzbereite Pflanzen'
                        ]
                      }`}</li>
                    )}
                    {o.payload['Zählung Bemerkungen'] && (
                      <li key={`${o.dataKey}7`}>{`Zählung Bemerkungen: ${
                        o.payload['Zählung Bemerkungen']
                      }`}</li>
                    )}
                    {o.payload['Lieferung Bemerkungen'] && (
                      <li key={`${o.dataKey}8`}>{`Lieferung Bemerkungen: ${
                        o.payload['Lieferung Bemerkungen']
                      }`}</li>
                    )}
                  </>
                )
              }
              return <li key={o.dataKey}>{`${o.dataKey}: ${o.value}`}</li>
            })}
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
          <YAxis
            label={{
              value: 'Anzahl',
              angle: -90,
              position: 'insideLeft',
              offset: 25,
              fontSize: 13,
            }}
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            align="right"
            wrapperStyle={{ right: -10, bottom: 12, fontSize: 12 }}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen"
            stroke="#4a148c"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen auspflanzbereit"
            stroke="#01792D"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Mutterpflanzen"
            stroke="#F91F3F"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen geplant"
            stroke="#d8d8f3"
            label={<LabelZaehlung />}
          />
          <Line
            type="basis"
            dataKey="Zählung Pflanzen geplant, ignoriert"
            legendType="circle"
            stroke="#d8d8f3"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Pflanzen auspflanzbereit geplant"
            stroke="#dbf0e3"
            label={<LabelZaehlung />}
          />
          <Line
            type="basis"
            dataKey="Zählung Pflanzen auspflanzbereit geplant, ignoriert"
            legendType="circle"
            stroke="#dbf0e3"
            label={<LabelZaehlung />}
          />
          <Line
            type="monotone"
            connectNulls={true}
            dataKey="Zählung Mutterpflanzen geplant"
            stroke="#FCAFBB"
            label={<LabelZaehlung />}
          />
          <Line
            type="basis"
            dataKey="Zählung Mutterpflanzen geplant, ignoriert"
            legendType="circle"
            stroke="#FCAFBB"
            label={<LabelZaehlung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen"
            fill="#4a148c"
            label={<LabelLieferung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen geplant"
            fill="#d8d8f3"
            label={<LabelLieferung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen geplant, ignoriert"
            label={<LabelLieferung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit"
            fill="#01792D"
            label={<LabelLieferung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant"
            fill="#dbf0e3"
            label={<LabelLieferung />}
          />
          <Bar
            dataKey="Lieferung Pflanzen auspflanzbereit geplant, ignoriert"
            fill="#707070"
            label={<LabelLieferung />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ErrorBoundary>
  )
}

export default Kultur
