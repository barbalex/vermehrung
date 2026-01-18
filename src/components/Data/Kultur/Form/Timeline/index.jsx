import { useState, useEffect } from 'react'
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
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useResizeDetector } from 'react-resize-detector'
import { motion, useAnimation } from 'framer-motion'

import { KulturTooltip } from './Tooltip.jsx'
import { KulturLabelLieferung as LabelLieferung } from './LabelLieferung.jsx'
import { KulturLabelZaehlung as LabelZaehlung } from './LabelZaehlung.jsx'
import { KulturCustomAxisTick as AxisTick } from './CustomAxisTick.jsx'
import { constants } from '../../../../../utils/constants.js'
import { exists } from '../../../../../utils/exists.js'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { buildKulturTimelineData as buildData } from './buildData.js'

import styles from './index.module.css'

export const KulturTimeline = ({ row }) => {
  const { width, ref } = useResizeDetector()
  // TODO: calc runs on every render of kultur
  // need to only run when open
  const [allData, setAllData] = useState([])
  useEffect(() => {
    let isActive = true
    buildData({ row }).then((data) => {
      if (!isActive) return

      setAllData(data)
    })

    return () => {
      isActive = false
    }
  }, [row])

  const openDocs = () => {
    const url = `${constants?.getAppUri()}/Dokumentation/zeitachse-kultur`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }

  const isNarrow = width < 1100

  const [open, setOpen] = useState(false)
  const anim = useAnimation()
  const onClickToggle = async (e) => {
    e.stopPropagation()
    if (open) {
      const was = open
      await anim.start({ opacity: 0 })
      await anim.start({ height: 0 })
      setOpen(!was)
    } else {
      setOpen(!open)
      setTimeout(async () => {
        await anim.start({ height: 'auto' })
        await anim.start({ opacity: 1 })
      })
    }
  }

  const showCategory = (category) =>
    !!allData.map((d) => d[category]).filter((d) => exists(d)).length

  // need to disable animation or labels will not show on first render
  // https://github.com/recharts/recharts/issues/806
  return (
    <section
      ref={ref}
      className={styles.container}
    >
      {!allData ?
        null
      : !row || !allData.length ?
        <ErrorBoundary>
          <div className={styles.titleRow}>
            <div className={styles.title}>Zeit-Achse</div>
            <div className={styles.content}>Sorry, keine Daten verfügbar</div>
          </div>
        </ErrorBoundary>
      : <ErrorBoundary>
          <div
            className={styles.titleRow}
            onClick={onClickToggle}
            title={open ? 'schliessen' : 'öffnen'}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.title}>Zeit-Achse</div>
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openDocs}
                size="large"
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              <IconButton
                aria-label={open ? 'schliessen' : 'öffnen'}
                title={open ? 'schliessen' : 'öffnen'}
                onClick={onClickToggle}
                size="large"
              >
                {open ?
                  <FaChevronUp />
                : <FaChevronDown />}
              </IconButton>
            </div>
          </div>
          <motion.div
            animate={anim}
            transition={{ type: 'just', duration: 0.2 }}
          >
            {open && (
              <ResponsiveContainer
                width="99%"
                height={450}
              >
                <ComposedChart
                  data={allData}
                  margin={{ top: 15, right: 0, left: 0, bottom: 45 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                  />
                  <XAxis
                    dataKey="datum"
                    tick={AxisTick}
                    interval={0}
                  />
                  <YAxis
                    label={{
                      value: 'Anzahl',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 25,
                      fontSize: 12,
                    }}
                    fontSize={12}
                  />
                  <Tooltip content={<KulturTooltip />} />
                  {isNarrow ?
                    <Legend
                      layout="horizontal"
                      align="center"
                      wrapperStyle={{ bottom: 0, fontSize: 12 }}
                    />
                  : <Legend
                      layout="vertical"
                      align="right"
                      wrapperStyle={{ right: -10, top: 50, fontSize: 12 }}
                    />
                  }
                  <ReferenceLine
                    y={0}
                    stroke="#000"
                  />
                  {showCategory('Lieferung Pflanzen') && (
                    <Bar
                      dataKey="Lieferung Pflanzen"
                      fill="#4a148c"
                      label={<LabelLieferung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Lieferung Pflanzen geplant') && (
                    <Bar
                      dataKey="Lieferung Pflanzen geplant"
                      fill="#ceceeb"
                      label={<LabelLieferung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Lieferung Pflanzen geplant, ignoriert') && (
                    <Bar
                      dataKey="Lieferung Pflanzen geplant, ignoriert"
                      fill="#ebebf9"
                      label={<LabelLieferung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Lieferung Pflanzen auspflanzbereit') && (
                    <Bar
                      dataKey="Lieferung Pflanzen auspflanzbereit"
                      fill="#016526"
                      label={<LabelLieferung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory(
                    'Lieferung Pflanzen auspflanzbereit geplant',
                  ) && (
                    <Bar
                      dataKey="Lieferung Pflanzen auspflanzbereit geplant"
                      fill="#9cffc0"
                      label={<LabelLieferung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory(
                    'Lieferung Pflanzen auspflanzbereit geplant, ignoriert',
                  ) && (
                    <Bar
                      dataKey="Lieferung Pflanzen auspflanzbereit geplant, ignoriert"
                      fill="#e6ffef"
                      label={<LabelLieferung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Zählung Pflanzen') && (
                    <Line
                      type="monotone"
                      connectNulls={true}
                      dataKey="Zählung Pflanzen"
                      stroke="#4a148c"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Pflanzen Bedarf') && (
                    <Line
                      type="monotone"
                      connectNulls={true}
                      dataKey="Pflanzen Bedarf"
                      stroke="#e0e0ff"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Pflanzen Bedarf, ignoriert') && (
                    <Line
                      type="basis"
                      dataKey="Pflanzen Bedarf, ignoriert"
                      legendType="circle"
                      stroke="#ebebf9"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Zählung Pflanzen auspflanzbereit') && (
                    <Line
                      type="monotone"
                      connectNulls={true}
                      dataKey="Zählung Pflanzen auspflanzbereit"
                      stroke="#016526"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Pflanzen auspflanzbereit Bedarf') && (
                    <Line
                      type="monotone"
                      connectNulls={true}
                      dataKey="Pflanzen auspflanzbereit Bedarf"
                      stroke="#9cffc0"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory(
                    'Pflanzen auspflanzbereit Bedarf, ignoriert',
                  ) && (
                    <Line
                      type="basis"
                      dataKey="Pflanzen auspflanzbereit Bedarf, ignoriert"
                      legendType="circle"
                      stroke="#e6ffef"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Zählung Mutterpflanzen') && (
                    <Line
                      type="monotone"
                      connectNulls={true}
                      dataKey="Zählung Mutterpflanzen"
                      stroke="#cc0000"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Mutterpflanzen Bedarf') && (
                    <Line
                      type="monotone"
                      connectNulls={true}
                      dataKey="Mutterpflanzen Bedarf"
                      stroke="#ffb3b3"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                  {showCategory('Mutterpflanzen Bedarf, ignoriert') && (
                    <Line
                      type="basis"
                      dataKey="Mutterpflanzen Bedarf, ignoriert"
                      legendType="circle"
                      stroke="#ffe6e6"
                      strokeWidth={3}
                      label={<LabelZaehlung />}
                      isAnimationActive={false}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </ErrorBoundary>
      }
    </section>
  )
}
