import { DateTime } from 'luxon'

import styles from './Tooltip.module.css'

export const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <div className={styles.container}>
        <div className={styles.pTitle}>
          <div>{DateTime.fromSQL(label).toFormat('yyyy.LL.dd')}</div>
          <div className={styles.ereignis}>{payload?.[0]?.payload?.title ?? ''}</div>
        </div>
        {payload
          // Zählung and Bedarf are only used for the optics,
          // do not want them in the tooltip
          ?.filter((p) => !['Zählung', 'Bedarf'].includes(p.dataKey))
          ?.map((o, i) => {
            const label = o.dataKey
            const value =
              label === 'Auspflanzung' && Math.abs(o.value) ?
                Math.abs(o.value)
              : o.value

            return (
              <div
                className={styles.pRow}
                key={`${label}${value}${i}`}
              >{`${label}: ${value}`}</div>
            )
          })}
      </div>
    )
  }

  return null
}
