import { DateTime } from 'luxon'

import { exists } from '../../../../../utils/exists.js'
import styles from './Tooltip.module.css'

// somehow payload sometimes arrives as undefined, so set to []
export const KulturTooltip = ({
  payload: payloadPassed = [],
  label,
  active,
}) => {
  // filter out zählung information if ereignis is not zählung
  const payload = [
    ...payloadPassed.filter((p) => {
      if (
        p.payload.ereignis !== 'Zählung' &&
        p.dataKey.includes('Zählung Pflanzen')
      ) {
        return false
      }
      return true
    }),
  ]

  if (active && label && payloadPassed) {
    const ereignis = payload?.[0]?.payload?.ereignis ?? ''
    const title = DateTime.fromMillis(label).toFormat('yyyy.LL.dd')

    return (
      <div className={styles.popup}>
        <div className={styles.pTitle}>
          {title}
          <div className={styles.ereignisClass}>{ereignis}</div>
        </div>
        {payload?.map((o, i) => {
          // do not repeat Zählung/Lieferung all over the place
          const label = o.dataKey
            .replace('Zählung ', '')
            .replace('Lieferung ', '')
          // if this payload is last non summable values
          if (i === payload.length - 1) {
            return (
              <div key={`${o.dataKey}0`}>
                <div
                  className={styles.pRow}
                  key={o.dataKey}
                >{`${label}: ${o.value}`}</div>
                {exists(o.payload['Lieferung Gramm Samen']) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}1`}
                  >{`Gramm Samen: ${o.payload['Lieferung Gramm Samen']}`}</div>
                )}
                {exists(o.payload['Bedarf']) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}10`}
                  >{`Bedarf: ${o.payload['Bedarf']}`}</div>
                )}
                {exists(o.payload['Zählung andere Mengen']) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}2`}
                  >{`andere Mengen: ${o.payload['Zählung andere Mengen']}`}</div>
                )}
                {exists(o.payload['Lieferung andere Mengen']) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}3`}
                  >{`andere Mengen: ${o.payload['Lieferung andere Mengen']}`}</div>
                )}
                {exists(o.payload['Lieferung von Anzahl Individuen']) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}4`}
                  >{`von Anzahl Individuen: ${o.payload['Lieferung von Anzahl Individuen']}`}</div>
                )}
                {exists(
                  o.payload['Zählung Beschreibung auspflanzbereite Pflanzen'],
                ) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}5`}
                  >{`Beschreibung auspflanzbereite Pflanzen: ${o.payload['Zählung Beschreibung auspflanzbereite Pflanzen']}`}</div>
                )}
                {exists(
                  o.payload['Lieferung Beschreibung auspflanzbereite Pflanzen'],
                ) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}6`}
                  >{`Beschreibung auspflanzbereite Pflanzen: ${o.payload['Lieferung Beschreibung auspflanzbereite Pflanzen']}`}</div>
                )}
                {exists(o.payload['Zählung Bemerkungen']) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}7`}
                  >{`Bemerkungen: ${o.payload['Zählung Bemerkungen']}`}</div>
                )}
                {exists(o.payload['Lieferung Bemerkungen']) && (
                  <div
                    className={styles.pRow}
                    key={`${o.dataKey}8`}
                  >{`Bemerkungen: ${o.payload['Lieferung Bemerkungen']}`}</div>
                )}
              </div>
            )
          }
          return (
            <div
              className={styles.pRow}
              key={o.dataKey}
            >{`${label}: ${o.value}`}</div>
          )
        })}
      </div>
    )
  }

  return null
}
